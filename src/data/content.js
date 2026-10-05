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
      title: "trankhanhh",
      // [SEO: mô tả 120-160 ký tự, hiển thị dưới kết quả tìm kiếm]
      description:
        "Trần Huy Khánh - học sinh đam mê lập trình thi đấu, C++ và công nghệ. Khám phá hành trình học tập, kỹ năng và những dự án cá nhân.",
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
      name: "Trần Huy Khánh",
      // [Vai trò: nghề nghiệp bạn muốn thể hiện, hiển thị dạng chữ xoay]
      roles: [
        "Student",
      ],
      // [1-2 câu: bạn làm gì, phục vụ ai và giá trị bạn tạo ra. Tối đa 20 từ.]
      tagline:
        "Học lập trình qua những *bài toán*, khám phá công nghệ và biến ý tưởng thành sản phẩm thực tế.",
      ctaPrimary: "Xem dự án",
      ctaSecondary: "Liên hệ",
    },
    about: {
      // [Nhãn section, viết thường, không đánh số]
      label: "Giới thiệu",
      heading: "Không ngừng học hỏi, thử nghiệm và *phát triển*.",
      // [2-3 đoạn giới thiệu thật, không bịa thành tích. Có thể chia nhiều đoạn.]
      body: [
        "Tôi là Trần Huy Khánh, một học sinh có niềm đam mê với lập trình và công nghệ. Hiện tại, tôi tập trung vào lập trình thi đấu với C++, rèn luyện tư duy thuật toán và giải quyết các bài toán có độ phức tạp ngày càng cao.",
        "Bên cạnh lập trình thi đấu, tôi còn quan tâm đến phát triển phần mềm, trí tuệ nhân tạo và các công cụ hỗ trợ lập trình. Tôi thích tìm hiểu cách công nghệ hoạt động, thử nghiệm những ý tưởng mới và ứng dụng kiến thức vào các dự án cá nhân",
      ],
      facts: [
        // [Thông tin nhanh, mỗi dòng một ý. Không bịa số liệu.]
        { k: "Kinh nghiệm", v: "Junior. Học lập trình được 2 năm" },
        { k: "Tập trung", v: "Lập trình thi đấu. Các mảng khác mỗi mảng 1 ít." },
        { k: "Vị trí", v: "Đắk Lắk, Việt Nam" },
      ],
    },
    skills: {
      label: "Kỹ năng",
      heading: "Những gì tôi làm hằng ngày",
      // [Mức % là tự đánh giá, hãy sửa cho đúng với bạn. Tối thiểu 5 mục.]
      items: [
        { name: "C++", level: 50, note: "Lập trình thi đấu." },
        { name: "Python", level: 30, note: "Có thể đọc hiểu, viết code đơn giản dùng tool." },
        { name: "Git/Github", level: 60, note: "Có thể sử dụng cơ bản, ứng dụng vào thực tế" },
        { name: "AI/Code cli", level: 80, note: "Ứng dụng AI, có khả năng dùng agents skills, plugins, ..." },
      ],
    },
    projects: {
      label: "Dự án",
      heading: "Một vài việc tôi đã làm",
      // [Tối thiểu 4 dự án. `link` nên trỏ tới nơi an toàn, ví dụ trang dự án
      //  hoặc repository. Placeholder mặc định dùng example.com để không lỗi.]
      items: [
        {
          title: "Portfolio",
          description: "Trang web giới thiệu bản thân tôi",
          category: "Website tĩnh",
          tech: ["React", "Vite"],
          link: "https://github.com/trankhanh2222/portfolio",
          image: "projects/portfolio.png",
          imageAlt: "Ảnh chụp giao diện tối của trang portfolio này",
          featured: true,
        },
      ],
      viewLabel: "Mở dự án",
      imagePlaceholder: "[Ảnh dự án]",
    },
    contact: {
      label: "Liên hệ",
      heading: "Tìm tôi tại: ",
      // [Một câu mời liên hệ, nêu rõ bạn nhận dạng công việc nào]
      blurb: " ",
      // [Email thật của bạn]
      email: "tranhuykhanh6444@gmail.com",
      emailLabel: "Email",
      copy: "Sao chép",
      copied: "Đã sao chép",
      copyError: "Không sao chép được, hãy chọn thủ công",
      mailLabel: "Gửi email",
      socials: [
        // [Liên kết mạng xã hội thật. Xoá bớt nếu không dùng.]
        { label: "GitHub", href: "https://github.com/trankhanh2222" },
        { label: "Facebook", href: "https://www.facebook.com/tran.khanh.411143" },
        { label: "Email", href: "mailto:tranhuykhanh6444@gmail.com" },
      ],
    },
    footer: {
      // [Câu cuối trang, có thể là ghi chú hoặc lời cảm ơn ngắn]
      note: "Cảm ơn vì mọi thứ",
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
      createdAt: " ",
    },
  },

  en: {
    meta: {
      // [SEO: browser tab title, keep it short and include your name]
      title: "trankhanhh",
      // [SEO: 120-160 character description shown under search results]
      description:
        "Tran Huy Khanh - a student passionate about competitive programming, C++ and technology. Explore my learning journey, skills and personal projects.",
    },
    nav: {
      // [Nav labels: keep short, each points to a real section]
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      // [Small line above the name, e.g. "Open to work" or your field]
      eyebrow: "Personal portfolio",
      // [Display name: the name you want shown on the portfolio]
      name: "Tran Huy Khanh",
      // [Roles: what you do, shown as rotating text]
      roles: ["Student"],
      // [1-2 sentences: what you do, for whom, and the value you create. Max 20 words.]
      tagline:
        "Learning to code through *problems*, exploring technology, and turning ideas into real products.",
      ctaPrimary: "View projects",
      ctaSecondary: "Get in touch",
    },
    about: {
      // [Section label, lowercase, no numbering]
      label: "About",
      heading: "Always learning, experimenting and *growing*.",
      // [2-3 honest intro paragraphs, no invented achievements. Can be split.]
      body: [
        "I am Tran Huy Khanh, a student with a passion for programming and technology. Right now I focus on competitive programming with C++, sharpening my algorithmic thinking and solving problems of ever-increasing difficulty.",
        "Beyond competitive programming, I am also interested in software development, artificial intelligence and developer tooling. I like understanding how technology works, trying new ideas and applying what I learn to personal projects.",
      ],
      facts: [
        // [Quick facts, one per line. Do not invent numbers.]
        { k: "Experience", v: "Junior. Been coding for 2 years" },
        { k: "Focus", v: "Competitive programming. A little of everything else." },
        { k: "Based in", v: "Dak Lak, Vietnam" },
      ],
    },
    skills: {
      label: "Skills",
      heading: "What I do day to day",
      // [The % is self-assessed, adjust it to match you. At least 5 items.]
      items: [
        { name: "C++", level: 50, note: "Competitive programming." },
        { name: "Python", level: 30, note: "Can read, write simple scripts and use tools." },
        { name: "Git/GitHub", level: 60, note: "Comfortable with the basics, used in real work." },
        { name: "AI/Code CLI", level: 80, note: "Using AI, agent skills, plugins and more." },
      ],
    },
    projects: {
      label: "Projects",
      heading: "A few things I have built",
      // [At least 4 projects. `link` should point somewhere safe, e.g. a project
      //  page or repository. Default placeholder uses example.com to avoid errors.]
      items: [
        {
          title: "Portfolio",
          description: "My personal website introducing who I am.",
          category: "Static website",
          tech: ["React", "Vite"],
          link: "https://github.com/trankhanh2222/portfolio",
          image: "projects/portfolio.png",
          imageAlt: "Screenshot of this portfolio in dark theme",
          featured: true,
        },
      ],
      viewLabel: "Open project",
      imagePlaceholder: "[Project image]",
    },
    contact: {
      label: "Contact",
      heading: "Find me at: ",
      // [One sentence inviting contact, stating what kind of work you take on]
      blurb: " ",
      // [Your real email]
      email: "tranhuykhanh6444@gmail.com",
      emailLabel: "Email",
      copy: "Copy",
      copied: "Copied",
      copyError: "Copy failed, please select it manually",
      mailLabel: "Send email",
      socials: [
        // [Real social links. Remove any you do not use.]
        { label: "GitHub", href: "https://github.com/trankhanh2222" },
        { label: "Facebook", href: "https://www.facebook.com/tran.khanh.411143" },
        { label: "Email", href: "mailto:tranhuykhanh6444@gmail.com" },
      ],
    },
    footer: {
      // [Closing line, a note or short thanks]
      note: "Thanks for everything",
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
      createdAt: " ",
    },
  },
};