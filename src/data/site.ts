export type Lang = "zh" | "en";
export type PageKey =
  | "home"
  | "about"
  | "solutions"
  | "engineering"
  | "facilities"
  | "customers"
  | "quality"
  | "contact";

export const languages: Record<Lang, { label: string; locale: string }> = {
  zh: { label: "中文", locale: "zh-CN" },
  en: { label: "EN", locale: "en" }
};

export const nav: Record<Lang, Array<{ key: PageKey; label: string; href: string }>> = {
  zh: [
    { key: "home", label: "首页", href: "/zh/" },
    { key: "about", label: "关于我们", href: "/zh/about/" },
    { key: "solutions", label: "核心业务", href: "/zh/solutions/" },
    { key: "engineering", label: "技术能力", href: "/zh/engineering/" },
    { key: "facilities", label: "生产设施", href: "/zh/facilities/" },
    { key: "customers", label: "客户案例", href: "/zh/customers/" },
    { key: "quality", label: "质量资质", href: "/zh/quality/" },
    { key: "contact", label: "联系我们", href: "/zh/contact/" }
  ],
  en: [
    { key: "home", label: "Home", href: "/en/" },
    { key: "about", label: "About", href: "/en/about/" },
    { key: "solutions", label: "Solutions", href: "/en/solutions/" },
    { key: "engineering", label: "Engineering", href: "/en/engineering/" },
    { key: "facilities", label: "Facilities", href: "/en/facilities/" },
    { key: "customers", label: "Customers", href: "/en/customers/" },
    { key: "quality", label: "Quality", href: "/en/quality/" },
    { key: "contact", label: "Contact", href: "/en/contact/" }
  ]
};

export const company = {
  zhName: "苏州劲翔电子科技有限公司",
  enName: "Suzhou Locus Technology Co.,Ltd",
  mexicoBranch: "DEY INNOVACION TECNICA",
  tel: "+86 512-69172216",
  fax: "+86 512-69172215",
  email: "ronghao@jinxiangsz.com",
  website: "www.jinxiangsz.com",
  addressZh: "苏州工业园区唯西路 96 号",
  addressEn: "No. 96 Weixi Road, Suzhou Industrial Park, Jiangsu Province, P.R. China",
  mexicoZh: "墨西哥蒙特雷",
  mexicoEn: "Monterrey, Mexico"
};

export const assets = {
  logo: "/assets/site/locus-logo.jpeg",
  homeHero: "/assets/site/home-hero.jpeg",
  hero: "/assets/site/hero-production-line.png",
  facility: "/assets/site/facility-floor.jpeg",
  globalMap: "/assets/site/global-delivery-map-20260713.png",
  processImages: [
    "/assets/site/process-079.jpeg",
    "/assets/site/process-072.jpeg",
    "/assets/site/process-074.jpeg",
    "/assets/site/process-077.jpeg"
  ],
  engineering: "/assets/site/engineering-layout.png",
  motor: "/assets/site/motor-testing-equipment.png",
  automation: "/assets/site/automation-cell.png",
  medical: "/assets/site/medical-equipment.png",
  testing: "/assets/site/test-equipment.png",
  customerLogos: [
    "/assets/site/customers/customer-01.jpeg",
    "/assets/site/customers/customer-02.png",
    "/assets/site/customers/customer-03.png",
    "/assets/site/customers/customer-04.png",
    "/assets/site/customers/customer-05.png",
    "/assets/site/customers/customer-06.png",
    "/assets/site/customers/customer-07.png",
    "/assets/site/customers/customer-08.png",
    "/assets/site/customers/customer-09.png",
    "/assets/site/customers/customer-10.png",
    "/assets/site/customers/customer-11.png",
    "/assets/site/customers/customer-12.png",
    "/assets/site/customers/customer-13.png",
    "/assets/site/customers/customer-14.jpeg",
    "/assets/site/customers/customer-15.png",
    "/assets/site/customers/customer-16.jpeg",
    "/assets/site/customers/customer-17.jpeg",
    "/assets/site/customers/customer-18.png",
    "/assets/site/customers/customer-19.png",
    "/assets/site/customers/customer-20.png"
  ],
  certificates: [
    "/assets/site/certificates/certificate-01.png",
    "/assets/site/certificates/certificate-02.jpeg",
    "/assets/site/certificates/certificate-high-tech-2025.jpeg",
    "/assets/site/certificates/certificate-04.jpeg",
    "/assets/site/certificates/certificate-05.jpeg",
    "/assets/site/certificates/certificate-06.png",
    "/assets/site/certificates/certificate-08.png",
    "/assets/site/certificates/certificate-09.png",
    "/assets/site/certificates/certificate-10.png"
  ]
};

export const ui = {
  zh: {
    brandLine: "非标自动化设备与产线集成",
    ctaPrimary: "了解核心业务",
    ctaContact: "联系我们",
    emailUs: "发送邮件",
    footer: "成立于 2006 年，专注非标自动化设备与产线集成。",
    language: "语言"
  },
  en: {
    brandLine: "Custom Automation Equipment & Line Integration",
    ctaPrimary: "Explore Solutions",
    ctaContact: "Contact Us",
    emailUs: "Email Us",
    footer: "Founded in 2006, focused on custom automation and line integration.",
    language: "Language"
  }
};

export const pages = {
  zh: {
    home: {
      title: "苏州劲翔电子科技有限公司 - 非标自动化",
      description: "苏州劲翔电子科技有限公司专注非标自动化设备、测试设备与产线集成。",
      heroTitle: "把复杂工艺做成稳定设备",
      heroSubtitle: "装配、测试、追溯一体化设备，服务全球制造现场。",
      heroBody: "从工艺评估到现场导入，缩短量产准备周期。",
      stats: [
        ["2006", "成立时间"],
        ["1200 m²", "苏州标准厂房"],
        ["30", "团队成员"],
        ["22", "工程设计人员"],
        ["ISO9001:2015", "质量体系"],
        ["Monterrey", "墨西哥服务能力"]
      ],
      sections: [
        {
          title: "定制方案",
          body: "围绕产品结构、节拍、质量和现场条件设计。"
        },
        {
          title: "完整交付",
          body: "覆盖设计、制造、调试、验收和现场导入。"
        },
        {
          title: "全球响应",
          body: "苏州制造，墨西哥服务，支持跨国项目落地。"
        }
      ],
      bottomCta: ["有自动化项目需要评估？", "告诉我们产品、节拍和交付计划，我们协助判断方向。"]
    },
    about: {
      title: "关于我们 - 苏州劲翔电子科技有限公司",
      description: "了解劲翔电子的发展历程、工程团队、苏州工厂和墨西哥服务能力。",
      heroTitle: "2006 年起，专注非标自动化",
      heroBody: "从方案、设计制造到海外导入，劲翔电子形成了完整交付能力。",
      body: [
        "公司以工程设计人员为核心，长期服务高要求制造现场。",
        "我们关注设备稳定性、可维护性和项目确定性。"
      ],
      strengths: [
        ["工程驱动", "从产品、工艺、测试和现场条件出发。"],
        ["完整交付", "覆盖方案、设计、制造、FAT、安装和 SAT。"],
        ["多行业经验", "服务电动工具、电机、医疗、汽车和新能源场景。"],
        ["体系支撑", "ISO9001、ERP、PDM 支撑项目过程管理。"],
        ["海外响应", "墨西哥蒙特雷分公司支持现场服务。"]
      ],
      timeline: [
        ["2006", "公司成立"],
        ["2008", "拓展电动工具与医疗行业"],
        ["2011", "ERP 与 PDM 上线"],
        ["2016", "通过 ISO9001:2015"],
        ["2018", "获高新技术企业认证"],
        ["2025", "墨西哥蒙特雷分公司建立"]
      ]
    },
    solutions: {
      title: "核心业务 - 非标自动化与测试设备",
      description: "劲翔电子提供非标自动化设备、装配线、测试检测设备和数据追溯集成。",
      heroTitle: "按工艺设计，按现场交付",
      heroBody: "从单站改造到整线规划，围绕节拍、质量和 ROI 解决生产瓶颈。",
      cards: [
        ["非标自动化单机", "半自动站、快换工装、防呆防错与自动化改造。"],
        ["自动化装配整线", "多工位协同、机器人上下料、柔性传输与节拍控制。"],
        ["测试与检测设备", "EOLT、视觉、高压、泄漏、声学振动和功能测试。"],
        ["数据采集与追溯", "打码扫码、MES 对接、测试数据和质量记录。"],
        ["汽车与新能源", "OBC、逆变器、ABS、DCU 等装配测试集成。"],
        ["医疗及其他设备", "医疗装配、视觉检测和定制测试单元。"]
      ]
    },
    engineering: {
      title: "技术能力 - 机械、控制、视觉与测试",
      description: "劲翔电子具备机械设计、电气控制、视觉检测、EOLT 测试、数据采集和工艺集成能力。",
      heroTitle: "机械、控制、测试协同",
      heroBody: "非标设备的稳定性，来自结构、控制、检测和工艺的协同设计。",
      groups: [
        ["工程设计", ["机械结构设计", "电气设计", "气动与传动设计", "工装夹具设计", "产线布局和节拍评估", "CAD 工程设计"]],
        ["控制与自动化", ["PLC 控制", "IPC 工控机", "HMI 人机界面", "伺服与运动控制", "机器人应用", "自动扫码和数据追溯"]],
        ["检测与测试", ["机器视觉检测", "EOLT 综合测试", "电气功能测试", "高压和绝缘耐压测试", "泄漏测试", "多通道数据采集"]],
        ["工艺集成", ["铆接", "压接", "打螺丝", "灌胶、涂胶、涂油", "焊接", "热熔", "激光打标", "清洗与包装"]]
      ],
      workflow: ["需求评审", "方案设计", "详细设计", "制造与装配", "调试与验证", "FAT / SAT", "售后支持"]
    },
    facilities: {
      title: "生产设施 - 苏州工厂与墨西哥蒙特雷服务能力",
      description: "劲翔电子拥有苏州 1200 平方米厂房，并通过墨西哥蒙特雷分公司支持海外现场服务。",
      heroTitle: "苏州制造，北美响应",
      heroBody: "苏州完成制造联调，墨西哥支持现场导入与后续服务。",
      cards: [
        ["苏州制造中心", "1200 平方米厂房，覆盖装配、电气和软件联调。"],
        ["装配与调试", "机械装配、电气接线、机构调整和测试验证。"],
        ["项目与质量管理", "ISO9001、ERP、PDM 支撑项目过程。"],
        ["墨西哥服务能力", "蒙特雷分公司支持海外现场服务。"]
      ]
    },
    customers: {
      title: "客户与案例 - 全球制造客户与项目经验",
      description: "劲翔电子服务全球制造客户，项目覆盖电动工具、电机、汽车、新能源和医疗设备。",
      heroTitle: "从图纸到量产",
      heroBody: "项目覆盖电动工具、汽车电子、新能源、医疗和电机制造现场。",
      cases: [
        ["电动工具装配测试线", "装配、功能测试、跑合老化、EOLT 和 OK/NG 分流。"],
        ["OBC 组装测试线", "多工位装配、测试流程、数据追溯和产线布局。"],
        ["ABS 壳体测试设备", "快换、防呆、视觉、高压测试和 MES 追溯。"],
        ["DCU 组装测试机", "扫码、激光刻字、组装、测试和数据保存。"],
        ["医疗视觉检测设备", "精密定位、视觉检测和质量验证。"],
        ["电机生产测试设备", "定子生产线、EC 电机测试和实验室测试设备。"]
      ]
    },
    quality: {
      title: "质量资质 - ISO、ERP、PDM",
      description: "劲翔电子通过 ISO9001:2015，并采用 ERP 和 PDM 支持项目、质量和文档管理。",
      heroTitle: "过程可控，资料可追溯",
      heroBody: "从图纸、BOM、变更到测试验收记录，以体系化管理降低项目不确定性。",
      systems: [
        ["ISO9001:2015", "覆盖项目过程、制造交付和质量记录。"],
        ["ERP", "管理采购、物料、资源和交付过程。"],
        ["PDM", "管理图纸、BOM、变更和项目数据。"]
      ],
      certificates: "展示公司质量体系证书、荣誉和专利资料。",
      docs: ["机械图纸", "电气图纸", "BOM", "操作说明", "测试报告", "验收资料", "备件清单"]
    },
    contact: {
      title: "联系我们 - 苏州劲翔电子科技有限公司",
      description: "联系劲翔电子，咨询自动化设备、产线集成和海外项目服务。",
      heroTitle: "开启您的下一个自动化项目",
      heroBody: "无论是概念阶段，还是已有工艺图纸，我们都可以参与评估。",
      ctaTitle: "准备开始评估项目？",
      ctaBody: "建议提供产品类型、工艺痛点、目标节拍（UPH）和交付周期。"
    }
  },
  en: {
    home: {
      title: "Suzhou Locus Technology Co.,Ltd - Custom Automation",
      description: "Suzhou Locus Technology provides custom automation equipment, test systems and line integration.",
      heroTitle: "Stable equipment for complex processes.",
      heroSubtitle: "Assembly, testing and traceability systems for global manufacturing sites.",
      heroBody: "From process review to site launch, we shorten the path to stable production.",
      stats: [
        ["2006", "Founded"],
        ["1,200 m²", "Suzhou facility"],
        ["30", "Team members"],
        ["22", "Engineering designers"],
        ["ISO9001:2015", "Quality system"],
        ["Monterrey", "Mexico branch"]
      ],
      sections: [
        {
          title: "Tailored Design",
          body: "Designed around product, takt time, quality and site constraints."
        },
        {
          title: "Complete Delivery",
          body: "Design, build, debugging, acceptance and site launch support."
        },
        {
          title: "Global Response",
          body: "Suzhou manufacturing with Mexico-based field service support."
        }
      ],
      bottomCta: ["Need to review an automation project?", "Share product, takt time and timeline. We can support the first review."]
    },
    about: {
      title: "About Us - Suzhou Locus Technology Co.,Ltd",
      description: "Learn about Suzhou Locus Technology, our engineering team, Suzhou facility and Mexico service capability.",
      heroTitle: "Custom automation since 2006.",
      heroBody: "Suzhou Locus Technology delivers from concept and build to overseas site launch.",
      body: [
        "Our team is centered on engineering design and demanding manufacturing sites.",
        "We focus on stability, maintainability and project certainty."
      ],
      strengths: [
        ["Engineering-driven", "Based on product, process, testing and site conditions."],
        ["Complete delivery", "Concept, design, build, FAT, installation and SAT."],
        ["Cross-industry experience", "Power tools, motors, medical, automotive and new energy."],
        ["System support", "ISO9001, ERP and PDM support project control."],
        ["Overseas response", "Monterrey branch supports on-site service."]
      ],
      timeline: [
        ["2006", "Company established"],
        ["2008", "Expanded into power tools and medical industries"],
        ["2011", "ERP and PDM launched"],
        ["2016", "Certified to ISO9001:2015"],
        ["2018", "Recognized as a National High-tech Enterprise"],
        ["2025", "Monterrey branch established"]
      ]
    },
    solutions: {
      title: "Solutions - Custom Automation and Test Equipment",
      description: "Suzhou Locus Technology provides custom automation, assembly lines, test equipment and traceability integration.",
      heroTitle: "Designed for process. Delivered for site.",
      heroBody: "From station retrofit to turnkey line, we focus on takt time, quality and ROI.",
      cards: [
        ["Custom Automation Stations", "Semi-automatic stations, quick-change tooling, error-proofing and retrofits."],
        ["Automated Assembly Lines", "Multi-station coordination, robotic loading, flexible transfer and takt control."],
        ["Testing & Inspection", "EOLT, vision, high-voltage, leak, acoustic, vibration and function tests."],
        ["Data & Traceability", "Marking, scanning, MES connection, test data and quality records."],
        ["Automotive & EV", "OBC, inverter, ABS and DCU assembly/testing integration."],
        ["Medical & Other Equipment", "Medical assembly, vision inspection and custom test units."]
      ]
    },
    engineering: {
      title: "Engineering - Mechanics, Controls, Vision and Testing",
      description: "Suzhou Locus Technology provides mechanical design, controls, vision inspection, EOLT testing, data acquisition and process integration.",
      heroTitle: "Mechanics, controls and testing in sync.",
      heroBody: "Stable automation depends on coordinated structure, control, inspection and process design.",
      groups: [
        ["Engineering Design", ["Mechanical structure design", "Electrical design", "Pneumatic and transmission design", "Tooling and fixture design", "Line layout and takt time evaluation", "CAD engineering design"]],
        ["Control & Automation", ["PLC control", "IPC industrial computer", "HMI interface", "Servo and motion control", "Robotics applications", "Barcode scanning and traceability"]],
        ["Inspection & Testing", ["Machine vision inspection", "EOLT integrated testing", "Electrical functional testing", "High-voltage and insulation testing", "Leak testing", "Multi-channel data acquisition"]],
        ["Process Integration", ["Riveting", "Press fitting", "Screw fastening", "Potting, dispensing and grease application", "Welding", "Hot melting", "Laser marking", "Cleaning and packaging"]]
      ],
      workflow: ["Requirement Review", "Concept Design", "Detailed Design", "Manufacturing & Assembly", "Debugging & Validation", "FAT / SAT", "After-sales Support"]
    },
    facilities: {
      title: "Manufacturing Facilities - Suzhou Facility and Monterrey Service Capability",
      description: "Suzhou Locus Technology operates a 1,200 m2 Suzhou facility with field service support from Monterrey, Mexico.",
      heroTitle: "Suzhou build. North America response.",
      heroBody: "Suzhou handles build and integration. Mexico supports launch and field service.",
      cards: [
        ["Suzhou Manufacturing Center", "1,200 m2 facility for assembly, wiring and software integration."],
        ["Assembly & Debugging", "Mechanical assembly, wiring, adjustment and validation."],
        ["Project & Quality Management", "ISO9001, ERP and PDM support project control."],
        ["Mexico Service Capability", "Monterrey branch supports overseas on-site service."]
      ]
    },
    customers: {
      title: "Customers & Cases - Global Manufacturing Customers and Project Experience",
      description: "Suzhou Locus Technology serves global manufacturing customers across power tools, motors, automotive, new energy and medical equipment.",
      heroTitle: "From blueprint to mass production.",
      heroBody: "Projects cover power tools, automotive electronics, new energy, medical and motor manufacturing sites.",
      cases: [
        ["Power Tool Assembly & Test Line", "Assembly, functional test, endurance test, EOLT and OK/NG sorting."],
        ["OBC Assembly & Test Line", "Multi-station assembly, testing, traceability and line layout."],
        ["ABS Housing Test Equipment", "Quick-change tooling, vision, high-voltage test and MES traceability."],
        ["DCU Assembly & Test Machine", "Scanning, laser marking, assembly, testing and data storage."],
        ["Medical Vision Inspection", "Precision positioning, vision inspection and quality validation."],
        ["Motor Production & Testing", "Stator lines, EC motor testing and lab test equipment."]
      ]
    },
    quality: {
      title: "Quality - ISO, ERP and PDM",
      description: "Suzhou Locus Technology is certified to ISO9001:2015 and uses ERP and PDM for project, quality and documentation control.",
      heroTitle: "Controlled process. Traceable records.",
      heroBody: "Drawing, BOM, change, testing and acceptance records are managed through structured systems.",
      systems: [
        ["ISO9001:2015", "Covers project process, manufacturing delivery and quality records."],
        ["ERP", "Manages purchasing, materials, resources and delivery."],
        ["PDM", "Manages drawings, BOM, changes and project data."]
      ],
      certificates: "Quality system certificates, honors and patent materials.",
      docs: ["Mechanical drawings", "Electrical drawings", "BOM", "Operation manuals", "Test reports", "Acceptance documents", "Spare parts lists"]
    },
    contact: {
      title: "Contact Us - Suzhou Locus Technology Co.,Ltd",
      description: "Contact Suzhou Locus Technology for automation equipment, line integration and overseas service.",
      heroTitle: "Let's build your next automation project.",
      heroBody: "From early concept to detailed process drawings, we can support project review.",
      ctaTitle: "Ready to review a project?",
      ctaBody: "Please include product type, process pain points, target UPH and timeline."
    }
  }
} as const;

export const pageKeys: PageKey[] = ["about", "solutions", "engineering", "facilities", "customers", "quality", "contact"];

export function oppositeLang(lang: Lang): Lang {
  return lang === "zh" ? "en" : "zh";
}

export function pageHref(lang: Lang, key: PageKey): string {
  return key === "home" ? `/${lang}/` : `/${lang}/${key}/`;
}
