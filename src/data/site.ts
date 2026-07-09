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
  globalMap: "/assets/site/global-delivery-map.png",
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
    "/assets/site/customers/customer-19.png"
  ],
  certificates: [
    "/assets/site/certificates/certificate-01.png",
    "/assets/site/certificates/certificate-02.jpeg",
    "/assets/site/certificates/certificate-03.jpeg",
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
    footer:
      "成立于 2006 年，交付装配、测试、检测和产线集成类非标自动化设备。",
    language: "语言"
  },
  en: {
    brandLine: "Custom Automation Equipment & Line Integration",
    ctaPrimary: "Explore Solutions",
    ctaContact: "Contact Us",
    emailUs: "Email Us",
    footer:
      "Founded in 2006, Suzhou Locus Technology builds custom equipment for assembly, testing, inspection and line integration.",
    language: "Language"
  }
};

export const pages = {
  zh: {
    home: {
      title: "苏州劲翔电子科技有限公司 - 非标自动化设备与产线集成",
      description:
        "苏州劲翔电子科技有限公司成立于 2006 年，交付装配、测试、检测和产线集成类非标自动化设备。",
      heroTitle: "将复杂工艺转化为可量产的自动化设备",
      heroSubtitle: "面向全球制造现场，交付稳定的装配、测试与追溯一体化设备。",
      heroBody:
        "从工艺评估到现场导入，我们帮助客户缩短量产准备周期，让自动化方案稳定落地。",
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
          title: "量身定制",
          body:
            "围绕产品结构、节拍和质量要求设计，兼顾效率、稳定性和追溯。"
        },
        {
          title: "端到端交付",
          body:
            "覆盖机械、电气、控制、视觉、数据采集和验收导入。"
        },
        {
          title: "全球化响应",
          body:
            "项目经验覆盖中国、美国、墨西哥、巴西、新加坡、马来西亚、捷克、俄罗斯、台湾等地区。"
        }
      ],
      bottomCta: ["有待评估的自动化项目？", "分享产品特性与产能期望，我们可协助判断初步方案方向。"]
    },
    about: {
      title: "关于我们 - 苏州劲翔电子科技有限公司",
      description: "了解苏州劲翔电子科技有限公司的发展历程、团队规模、苏州工厂和墨西哥蒙特雷服务能力。",
      heroTitle: "始于 2006，用工程能力服务制造现场",
      heroBody:
        "劲翔电子长期服务高要求制造行业，已形成从方案构思、设计制造到海外交付的完整项目能力。",
      body: [
        "作为技术驱动型企业，公司超过七成团队成员为工程设计人员。",
        "我们交付的不只是设备，也包括生产现场需要的稳定性、可维护性和项目确定性。"
      ],
      strengths: [
        ["工程驱动", "从产品结构、工艺路线、测试要求和现场条件出发。"],
        ["完整交付", "覆盖方案、设计、制造、调试、FAT、安装、SAT 和售后。"],
        ["跨行业经验", "服务电动工具、电机、医疗、汽车零部件和新能源制造场景。"],
        ["体系支撑", "ISO9001:2015、ERP 和 PDM 支撑质量、资源和产品数据管理。"],
        ["海外响应", "墨西哥蒙特雷分公司 DEY INNOVACION TECNICA 支持现场服务。"]
      ],
      timeline: [
        ["2006", "公司正式成立，注册资金 550 万元"],
        ["2008", "从半导体领域拓展至电动工具及医疗行业"],
        ["2011", "ERP & PDM 系统正式上线"],
        ["2016", "通过 ISO9001:2015，拓展汽车零部件业务"],
        ["2018", "获得国家高新技术企业认证"],
        ["2025", "墨西哥分公司 DEY INNOVACION TECNICA 在蒙特雷建立"]
      ]
    },
    solutions: {
      title: "核心业务 - 非标自动化设备、装配线、测试检测设备",
      description: "劲翔电子提供非标自动化设备、自动化装配线、测试检测设备，以及电机、电动工具、汽车新能源和医疗行业设备。",
      heroTitle: "贴合实际工艺，避免过度设计",
      heroBody:
        "我们按产品、节拍、质量要求和现场条件配置设备形态。无论是单站改造还是整线规划，都以解决生产瓶颈为目标。",
      cards: [
        ["非标自动化单机", "半自动工作站、快换工装、防呆防错、打码扫码与自动化改造。"],
        ["自动化装配整线", "多工位协同、机器人上下料、柔性传输与产线节拍控制。"],
        ["精密测试与检测", "EOLT 综合测试、机器视觉、高压泄漏、声学振动和功能验证。"],
        ["数据采集与追溯", "自动打码扫码、MES 对接、测试数据采集和质量记录管理。"],
        ["汽车与新能源设备", "OBC、逆变器、ABS 壳体、DCU 等装配测试及追溯集成。"],
        ["医疗及其他设备", "医疗产品装配、视觉检测、半导体相关设备和定制测试单元。"]
      ]
    },
    engineering: {
      title: "技术能力 - 机械设计、电气控制、PLC、视觉检测、测试系统",
      description: "劲翔电子具备机械设计、电气控制、PLC/IPC、运动控制、视觉检测、机器人、EOLT 测试、数据采集和工艺集成能力。",
      heroTitle: "跨学科技术的精准融合",
      heroBody:
        "优秀的非标设备不是采购件的拼凑，而是机械结构、底层控制与测试方法的协同。",
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
      description: "劲翔电子拥有苏州 1200 平方米标准厂房，覆盖设备装配、调试、检测和项目管理，并通过墨西哥蒙特雷分公司支持海外客户服务。",
      heroTitle: "支撑全球交付的制造与联调基地",
      heroBody:
        "依托苏州制造与联调能力，以及墨西哥蒙特雷服务点，支持设备 FAT、现场导入和后续响应。",
      cards: [
        ["苏州制造中心", "1200 平方米专属厂房，覆盖整线组装、电气布线与软件联调。"],
        ["装配与调试", "覆盖机械装配、电气接线、机构调整、软件联调和测试验证。"],
        ["项目与质量管理", "ISO9001:2015、ERP 和 PDM 支撑质量、资源和产品数据管理。"],
        ["墨西哥服务能力", "DEY INNOVACION TECNICA 位于蒙特雷，支持海外现场服务。"]
      ]
    },
    customers: {
      title: "客户与案例 - 全球制造客户与项目经验",
      description: "劲翔电子服务全球制造客户，项目覆盖电动工具、电机、汽车零部件、新能源、医疗和半导体相关设备。",
      heroTitle: "见证从图纸到量产的现场落地",
      heroBody:
        "深耕电动工具、汽车电子、新能源与医疗器械等制造场景，以项目现场验证交付能力。",
      cases: [
        ["电动工具装配与测试线", "装配、功能测试、跑合老化、EOLT、数据采集和 OK/NG 分流。"],
        ["OBC 车载充电器组装与测试线", "多工位装配、测试流程、数据追溯和产线布局。"],
        ["ABS 壳体测试设备", "快换工装、防呆、打码、机器人、输送、视觉、高压测试和 MES 追溯。"],
        ["DCU 组装及测试机", "Siemens PLC 控制，覆盖扫码、激光刻字、组装、测试和数据保存。"],
        ["医疗视觉检测设备", "精密定位、视觉检测、产品处理和质量验证。"],
        ["电机生产与测试设备", "全定子/半定子生产线、EC 电机空载测试和实验室测试设备。"]
      ]
    },
    quality: {
      title: "质量与资质 - ISO、ERP、PDM、荣誉与专利",
      description: "劲翔电子通过 ISO9001:2015 质量管理体系，并采用 ERP 和 PDM 系统支持项目交付、质量管理、产品数据和文档管理。",
      heroTitle: "把可追溯性落实到设计与交付过程",
      heroBody:
        "从图纸版本、BOM、工程变更到测试和验收记录，我们通过体系化管理降低非标定制过程中的不确定性。",
      systems: [
        ["ISO9001:2015", "覆盖项目过程、制造交付、质量记录和持续改进。"],
        ["ERP", "用于采购、物料、项目资源和交付过程管理。"],
        ["PDM", "用于图纸、BOM、工程变更和项目数据管理。"]
      ],
      certificates: "页面展示公司现有质量体系证书、荣誉和专利资料。",
      docs: ["机械图纸", "电气图纸", "BOM", "操作说明", "测试报告", "验收资料", "备件清单"]
    },
    contact: {
      title: "联系我们 - 苏州劲翔电子科技有限公司",
      description: "联系苏州劲翔电子科技有限公司，咨询自动化设备、产线集成和海外项目服务。",
      heroTitle: "开启您的下一个自动化项目",
      heroBody: "无论您目前处于概念构思阶段，还是已有明确的工艺图纸，我们都期待与您交流。",
      ctaTitle: "准备开始评估项目？",
      ctaBody: "建议在邮件中简述产品类型、当前工艺痛点、期望节拍（UPH）及交付周期。"
    }
  },
  en: {
    home: {
      title: "Suzhou Locus Technology Co.,Ltd - Custom Automation Equipment & Line Integration",
      description:
        "Founded in 2006, Suzhou Locus Technology builds custom equipment for assembly, testing, inspection and line integration.",
      heroTitle: "Turning complex processes into production-ready automation.",
      heroSubtitle: "Reliable assembly, testing and traceability equipment for global manufacturing sites.",
      heroBody:
        "From process review to site launch, we help customers reduce ramp-up time and bring automation projects into stable production.",
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
          body:
            "Designed around product structure, takt time, process requirements and quality standards."
        },
        {
          title: "End-to-End Delivery",
          body:
            "Mechanical, electrical, control, vision, data acquisition and acceptance support."
        },
        {
          title: "Global Response",
          body:
            "Project experience across China, the United States, Mexico, Brazil, Singapore, Malaysia, Czech Republic, Russia and Taiwan."
        }
      ],
      bottomCta: ["Need to review an automation project?", "Share product, process, takt time and quality requirements. Our engineering team can support the initial review."]
    },
    about: {
      title: "About Us - Suzhou Locus Technology Co.,Ltd",
      description: "Learn about Suzhou Locus Technology, including our history, team, Suzhou facility and Monterrey, Mexico service support.",
      heroTitle: "Engineering-driven automation since 2006.",
      heroBody:
        "With nearly two decades of project experience, Suzhou Locus Technology has built delivery capabilities from concept design to overseas site support.",
      body: [
        "As an engineering-centric company, over 70% of our team members are engineering designers.",
        "We deliver more than machines. We deliver the stability, maintainability and project certainty that production sites require."
      ],
      strengths: [
        ["Engineering-driven approach", "Designed around product structure, process flow, testing requirements and site conditions."],
        ["Complete delivery", "Concept, design, manufacturing, debugging, FAT, installation, SAT and after-sales service."],
        ["Cross-industry experience", "Power tools, motors, medical products, automotive components and new energy applications."],
        ["System support", "ISO9001:2015, ERP and PDM support quality, resource planning and product data management."],
        ["Overseas response", "DEY INNOVACION TECNICA in Monterrey, Mexico supports on-site service."]
      ],
      timeline: [
        ["2006", "Company established with registered capital of RMB 5.5 million"],
        ["2008", "Expanded from semiconductor-related projects into power tools and medical industries"],
        ["2011", "ERP & PDM systems officially launched"],
        ["2016", "Certified to ISO9001:2015 and expanded into automotive components"],
        ["2018", "Recognized as a National High-tech Enterprise"],
        ["2025", "DEY INNOVACION TECNICA established in Monterrey, Mexico"]
      ]
    },
    solutions: {
      title: "Solutions - Custom Automation Equipment, Assembly Lines, Testing & Inspection",
      description: "Suzhou Locus Technology provides custom automation equipment, automated assembly lines, testing and inspection equipment, and systems for motor, power tool, automotive, EV and medical applications.",
      heroTitle: "Fit-for-purpose equipment, without unnecessary complexity.",
      heroBody:
        "Equipment format is defined by product, process, takt time, quality requirements and site conditions. Whether for a station retrofit or a turnkey line, the goal is to solve the production bottleneck.",
      cards: [
        ["Custom Automation Stations", "Semi-automatic stations, quick-change tooling, error-proofing, marking, scanning and retrofits."],
        ["Automated Assembly Lines", "Multi-station coordination, robotic loading, flexible transfer and line takt control."],
        ["Precision Testing & Inspection", "EOLT, machine vision, high-voltage, leak, acoustic, vibration and functional testing."],
        ["Data & Traceability", "Automatic marking, scanning, MES connection, test data collection and quality records."],
        ["Automotive & EV Equipment", "OBC, inverter, ABS housing and DCU assembly/testing with MES integration."],
        ["Medical & Other Industry Equipment", "Medical product assembly, vision inspection, semiconductor-related equipment and custom test units."]
      ]
    },
    engineering: {
      title: "Engineering Capabilities - Mechanical Design, Controls, PLC, Vision and Test Systems",
      description: "Suzhou Locus Technology provides mechanical design, electrical control, PLC/IPC, motion control, vision inspection, robotics, EOLT testing, data acquisition and process integration capabilities.",
      heroTitle: "Precision integration across disciplines.",
      heroBody:
        "Exceptional custom automation is not just about assembling components. It is the coordination of mechanical design, core controls and testing methods.",
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
      description: "Suzhou Locus Technology operates a 1,200 m2 facility in Suzhou covering equipment assembly, debugging, inspection and project management, with overseas service support from Monterrey, Mexico.",
      heroTitle: "The foundation for global delivery and integration.",
      heroBody:
        "Supported by our manufacturing and integration center in China and a direct service branch in Mexico, we support FAT, site launch and follow-up response.",
      cards: [
        ["Suzhou Manufacturing Center", "A 1,200 m2 dedicated facility covering line assembly, electrical wiring and software integration."],
        ["Assembly & Debugging", "Mechanical assembly, electrical wiring, adjustment, software integration and validation."],
        ["Project & Quality Management", "ISO9001:2015, ERP and PDM support quality, resources and product data."],
        ["Mexico Service Capability", "DEY INNOVACION TECNICA in Monterrey supports overseas on-site service."]
      ]
    },
    customers: {
      title: "Customers & Cases - Global Manufacturing Customers and Project Experience",
      description: "Suzhou Locus Technology serves global manufacturing customers, with projects covering power tools, motors, automotive components, new energy, medical products and semiconductor-related equipment.",
      heroTitle: "Bridging the gap from blueprint to mass production.",
      heroBody:
        "Deep experience in power tools, automotive electronics, new energy and medical devices, validated by successful deployments across manufacturing sites.",
      cases: [
        ["Power Tool Assembly & Testing Line", "Assembly, functional testing, endurance testing, EOLT, data acquisition and OK/NG sorting."],
        ["OBC Assembly and Testing Line", "Multi-station assembly, testing process, data traceability and line layout."],
        ["ABS Housing Testing Equipment", "Quick-change tooling, error-proofing, laser marking, robotics, conveyor, vision system, high-voltage testing and MES traceability."],
        ["DCU Assembly and Testing Machine", "Siemens PLC control for scanning, laser marking, assembly, testing and data storage."],
        ["Medical Vision Inspection Equipment", "Precision positioning, vision inspection, product handling and quality validation."],
        ["Motor Production and Testing Equipment", "Full stator and half stator lines, EC motor no-load testing and lab test equipment."]
      ]
    },
    quality: {
      title: "Quality & Certifications - ISO, ERP, PDM, Honors and Patents",
      description: "Suzhou Locus Technology is certified to ISO9001:2015 and uses ERP and PDM systems to support project delivery, quality management, product data and documentation management.",
      heroTitle: "Traceability built into design and delivery.",
      heroBody:
        "From drawing versions and BOM control to engineering changes, testing records and acceptance documents, our systems help reduce uncertainty in custom automation projects.",
      systems: [
        ["ISO9001:2015", "Covers project processes, manufacturing delivery, quality records and improvement."],
        ["ERP", "Supports purchasing, materials, project resources and delivery management."],
        ["PDM", "Supports drawings, BOM, engineering changes and project data management."]
      ],
      certificates: "This page displays current quality system certificates, honors and patent materials.",
      docs: ["Mechanical drawings", "Electrical drawings", "BOM", "Operation manuals", "Test reports", "Acceptance documents", "Spare parts lists"]
    },
    contact: {
      title: "Contact Us - Suzhou Locus Technology Co.,Ltd",
      description: "Contact Suzhou Locus Technology for automation equipment, line integration and overseas project service.",
      heroTitle: "Let's build your next automation project.",
      heroBody: "Whether you are in the early concept phase or already have process drawings, we are ready to talk.",
      ctaTitle: "Ready to review a project?",
      ctaBody: "For a faster response, please include product type, current process pain points, target takt time (UPH), and expected timeline."
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
