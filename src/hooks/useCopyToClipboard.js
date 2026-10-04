import { useCallback, useRef, useState } from "react";

// Sao chep van ban, xu ly ca truong hop Clipboard API khong kha dung.
export function useCopyToClipboard(timeout = 2000) {
  const [status, setStatus] = useState("idle"); // idle | copied | error
  const timer = useRef(null);

  const reset = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), timeout);
  }, [timeout]);

  const copy = useCallback(
    async (text) => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback cho http hoac trinh duyet cu.
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.setAttribute("readonly", "");
          ta.style.position = "absolute";
          ta.style.left = "-9999px";
          document.body.appendChild(ta);
          ta.select();
          const ok = document.execCommand && document.execCommand("copy");
          document.body.removeChild(ta);
          if (!ok) throw new Error("execCommand failed");
        }
        setStatus("copied");
        reset();
        return true;
      } catch {
        setStatus("error");
        reset();
        return false;
      }
    },
    [reset]
  );

  return { copy, status };
}