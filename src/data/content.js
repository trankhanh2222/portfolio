// ---------------------------------------------------------------------------
// Nguồn nội dung duy nhất của trang.
// Mọi chữ hiển thị cho người dùng nằm ở đây, không hard-code trong component.
// Có hai ngôn ngữ: `vi` (mặc định) và `en`.
//
// CÁCH THAY NỘI DUNG:
//   - Mỗi chỗ có dạng [ ... ] là placeholder. Hãy thay bằng thông tin thật của bạn.
//   - Giữ nguyên cấu trúc key, chỉ sửa giá trị.
//   - Khi thêm dự án/kỹ năng mới, sao chép một mục có sẵn rồi sửa.
// ---------------------------------------------------------------------------

export const content = {
  vi: {
    meta: {
      // [SEO: tiêu đề tab trình duyệt, nên ngắn gọn và có tên bạn]
      title: "[Tên bạn] - Portfolio",
      // [SEO: mô tả 120-160 ký tự, hiển thị dưới kết quả tìm kiếm]
      description:
        "[Mô tả ngắn 120-160 ký tự về bạn, chuyên môn và giá trị bạn mang lại cho người xem portfolio này.]",
    },
    nav: {
      // [Nhãn điều hướng: giữ ngắn, mỗi mục trỏ tới một section có thật]
      home: "Trang chủ",
      about: "Giới thiệu",
      skills: "Kỹ năng",
      projects: "Dự án",
      contact: "Liên hệ",
    },
    hero: {
      // [Dòng nhỏ phía trên tên, ví dụ "Đang nhận dự án" hoặc lĩnh vực bạn làm]
      eyebrow: "Portfolio cá nhân",
      // [Tên hiển thị: tên bạn muốn xuất hiện trên portfolio]
      name: "[Tên hiển thị]",
      // [Vai trò: nghề nghiệp bạn muốn thể hiện, hiển thị dạng chữ xoay]
      roles: [
        "[Vai trò 1: ví dụ Frontend Developer]",
        "[Vai trò 2: ví dụ UI Engineer]",
        "[Vai trò 3: ví dụ Motion Designer]",
      ],
      // [1-2 câu: bạn làm gì, phục vụ ai và giá trị bạn tạo ra. Tối đa 20 từ.]
      tagline:
        "[1-2 câu: bạn làm gì, phục vụ ai và giá trị bạn tạo ra]",
      ctaPrimary: "Xem dự án",
      ctaSecondary: "Liên hệ",
    },
    about: {
      // [Nhãn section, viết thường, không đánh số]
      label: "Giới thiệu",
      heading: "[Một câu mô tả bạn bằng chính giọng của bạn]",
      // [2-3 đoạn giới thiệu thật, không bịa thành tích. Có thể chia nhiều đoạn.]
      body: [
        "[Đoạn 1: bạn là ai, xuất phát từ đâu, hiện tập trung vào điều gì.]",
        "[Đoạn 2: cách bạn làm việc, điều bạn quan tâm khi xây sản phẩm.]",
      ],
      facts: [
        // [Thông tin nhanh, mỗi dòng một ý. Không bịa số liệu.]
        { k: "Kinh nghiệm", v: "[Số năm hoặc giai đoạn bạn thật sự làm việc]" },
        { k: "Tập trung", v: "[Lĩnh vực chính bạn dành nhiều thời gian nhất]" },
        { k: "Vị trí", v: "[Thành phố / hình thức làm việc, ví dụ Remote]" },
      ],
    },
    skills: {
      label: "Kỹ năng",
      heading: "Những gì tôi làm hằng ngày",
      // [Mức % là tự đánh giá, hãy sửa cho đúng với bạn. Tối thiểu 5 mục.]
      items: [
        { name: "[Kỹ năng 1]", level: 90, note: "[Một dòng mô tả bạn dùng nó vào việc gì]" },
        { name: "[Kỹ năng 2]", level: 85, note: "[Một dòng mô tả bạn dùng nó vào việc gì]" },
        { name: "[Kỹ năng 3]", level: 80, note: "[Một dòng mô tả bạn dùng nó vào việc gì]" },
        { name: "[Kỹ năng 4]", level: 75, note: "[Một dòng mô tả bạn dùng nó vào việc gì]" },
        { name: "[Kỹ năng 5]", level: 70, note: "[Một dòng mô tả bạn dùng nó vào việc gì]" },
      ],
    },
    projects: {
      label: "Dự án",
      heading: "Một vài việc tôi đã làm",
      // [Tối thiểu 4 dự án. `link` nên trỏ tới nơi an toàn, ví dụ trang dự án
      //  hoặc repository. Placeholder mặc định dùng example.com để không lỗi.]
      items: [
        {
          title: "[Tên dự án 1]",
          description: "[2-3 câu: bài toán, bạn làm gì, kết quả là gì]",
          category: "[Loại: Web / Mobile / Tool]",
          tech: ["[Công nghệ]", "[Công nghệ]", "[Công nghệ]"],
          link: "https://example.com",
          visual: "type",
          featured: true,
        },
        {
          title: "[Tên dự án 2]",
          description: "[2-3 câu mô tả ngắn]",
          category: "[Loại]",
          tech: ["[Công nghệ]", "[Công nghệ]"],
          link: "https://example.com",
          visual: "grid",
          featured: false,
        },
        {
          title: "[Tên dự án 3]",
          description: "[2-3 câu mô tả ngắn]",
          category: "[Loại]",
          tech: ["[Công nghệ]", "[Công nghệ]"],
          link: "https://example.com",
          visual: "wave",
          featured: false,
        },
        {
          title: "[Tên dự án 4]",
          description: "[2-3 câu mô tả ngắn]",
          category: "[Loại]",
          tech: ["[Công nghệ]", "[Công nghệ]"],
          link: "https://example.com",
          visual: "stack",
          featured: false,
        },
      ],
      viewLabel: "Mở dự án",
    },
    contact: {
      label: "Liên hệ",
      heading: "Cùng trao đổi về công việc tiếp theo",
      // [Một câu mời liên hệ, nêu rõ bạn nhận dạng công việc nào]
      blurb: "[Một câu: bạn đang tìm cơ hội / nhận loại dự án nào]",
      // [Email thật của bạn]
      email: "hello@example.com",
      emailLabel: "Email",
      copy: "Sao chép",
      copied: "Đã sao chép",
      copyError: "Không sao chép được, hãy chọn thủ công",
      mailLabel: "Gửi email",
      socials: [
        // [Liên kết mạng xã hội thật. Xoá bớt nếu không dùng.]
        { label: "GitHub", href: "https://github.com/[tài-khoản]" },
        { label: "LinkedIn", href: "https://linkedin.com/in/[tài-khoản]" },
        { label: "Email", href: "mailto:hello@example.com" },
      ],
    },
    footer: {
      // [Câu cuối trang, có thể là ghi chú hoặc lời cảm ơn ngắn]
      note: "[Ghi chú cuối trang: ví dụ cảm ơn vì đã ghé qua]",
      backToTop: "Lên đầu trang",
    },
    a11y: {
      skipToContent: "Bỏ qua để tới nội dung chính",
      openMenu: "Mở menu điều hướng",
      closeMenu: "Đóng menu điều hướng",
      toggleTheme: "Đổi giao diện sáng tối",
      toggleThemeToLight: "Chuyển sang giao diện sáng",
      toggleThemeToDark: "Chuyển sang giao diện tối",
      switchLanguage: "Chuyển ngôn ngữ",
      navLabel: "Điều hướng chính",
      tocLabel: "Mục lục",
      navAria: "Chuyển tới các phần của trang",
      scrolledNav: "Thanh điều hướng đã thu gọn",
      skillLevel: "Mức độ",
      projectOf: "Dự án",
      externalLink: "mở trong tab mới",
      roleRotator: "Vai trò hiện tại",
      createdAt: "Xây dựng bằng React và Vite",
    },
  },

  en: {
    meta: {
      title: "[Your Name] - Portfolio",
      description:
        "[Short 120-160 character description of who you are, your craft, and the value this portfolio shows.]",
    },
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Personal portfolio",
      name: "[Display name]",
      roles: [
        "[Role 1: e.g. Frontend Developer]",
        "[Role 2: e.g. UI Engineer]",
        "[Role 3: e.g. Motion Designer]",
      ],
      tagline: "[One or two sentences: what you do, for whom, and the value you create]",
      ctaPrimary: "View projects",
      ctaSecondary: "Get in touch",
    },
    about: {
      label: "About",
      heading: "[One sentence that describes you in your own voice]",
      body: [
        "[Paragraph 1: who you are, where you started, what you focus on now.]",
        "[Paragraph 2: how you work and what you care about when building products.]",
      ],
      facts: [
        { k: "Experience", v: "[Years or period you have genuinely worked]" },
        { k: "Focus", v: "[The area you spend most of your time on]" },
        { k: "Based in", v: "[City / working arrangement, e.g. Remote]" },
      ],
    },
    skills: {
      label: "Skills",
      heading: "What I do day to day",
      items: [
        { name: "[Skill 1]", level: 90, note: "[One line on how you use it]" },
        { name: "[Skill 2]", level: 85, note: "[One line on how you use it]" },
        { name: "[Skill 3]", level: 80, note: "[One line on how you use it]" },
        { name: "[Skill 4]", level: 75, note: "[One line on how you use it]" },
        { name: "[Skill 5]", level: 70, note: "[One line on how you use it]" },
      ],
    },
    projects: {
      label: "Projects",
      heading: "A few things I have built",
      items: [
        {
          title: "[Project 1 name]",
          description: "[2-3 sentences: the problem, what you did, the outcome]",
          category: "[Type: Web / Mobile / Tool]",
          tech: ["[Tech]", "[Tech]", "[Tech]"],
          link: "https://example.com",
          visual: "type",
          featured: true,
        },
        {
          title: "[Project 2 name]",
          description: "[Short 2-3 sentence description]",
          category: "[Type]",
          tech: ["[Tech]", "[Tech]"],
          link: "https://example.com",
          visual: "grid",
          featured: false,
        },
        {
          title: "[Project 3 name]",
          description: "[Short 2-3 sentence description]",
          category: "[Type]",
          tech: ["[Tech]", "[Tech]"],
          link: "https://example.com",
          visual: "wave",
          featured: false,
        },
        {
          title: "[Project 4 name]",
          description: "[Short 2-3 sentence description]",
          category: "[Type]",
          tech: ["[Tech]", "[Tech]"],
          link: "https://example.com",
          visual: "stack",
          featured: false,
        },
      ],
      viewLabel: "Open project",
    },
    contact: {
      label: "Contact",
      heading: "Let us talk about the next thing",
      blurb: "[One sentence: the opportunities or work you are open to]",
      email: "hello@example.com",
      emailLabel: "Email",
      copy: "Copy",
      copied: "Copied",
      copyError: "Copy failed, please select it manually",
      mailLabel: "Send email",
      socials: [
        { label: "GitHub", href: "https://github.com/[account]" },
        { label: "LinkedIn", href: "https://linkedin.com/in/[account]" },
        { label: "Email", href: "mailto:hello@example.com" },
      ],
    },
    footer: {
      note: "[Footer note: e.g. thanks for stopping by]",
      backToTop: "Back to top",
    },
    a11y: {
      skipToContent: "Skip to main content",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
      toggleTheme: "Toggle light and dark theme",
      toggleThemeToLight: "Switch to light theme",
      toggleThemeToDark: "Switch to dark theme",
      switchLanguage: "Switch language",
      navLabel: "Primary navigation",
      tocLabel: "Contents",
      navAria: "Jump to page sections",
      scrolledNav: "Navigation bar condensed",
      skillLevel: "Level",
      projectOf: "Project",
      externalLink: "opens in a new tab",
      roleRotator: "Current role",
      createdAt: "Built with React and Vite",
    },
  },
};