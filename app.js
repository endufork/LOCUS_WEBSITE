(function () {
  "use strict";

  const DAY_MS = 24 * 60 * 60 * 1000;
  const DAY_WIDTH = 20;
  const STORAGE_KEY = "equipment-gantt-v1";

  const messages = {
    zh: {
      appTitle: "设备项目甘特图",
      appSubtitle: "非标设备排期工作台",
      addTask: "新增任务",
      importCsv: "导入CSV",
      importPngRestore: "导入PNG还原",
      exportCsv: "导出CSV",
      exportExcel: "导出Excel",
      exportPng: "导出PNG",
      previewReport: "汇报预览",
      previewTitle: "客户汇报预览",
      previewHint: "这里显示导出 PNG 的实际版式",
      downloadPreviewPng: "下载PNG",
      closePreview: "关闭",
      resetSample: "重置示例",
      project: "项目",
      customer: "客户",
      delivery: "交期",
      companyName: "公司",
      companyLogo: "Logo",
      chooseLogo: "选择Logo",
      clearLogo: "清除",
      logoReady: "已添加",
      logoEmpty: "未添加",
      projectCode: "项目编号",
      reportVersion: "版本",
      updateDate: "更新日期",
      weekMode: "周数",
      weekIso: "ISO周",
      weekNatural: "自然周",
      weekProject: "项目周",
      barLabel: "条内文字",
      barLabelNone: "不显示",
      barLabelPhase: "阶段",
      barLabelDates: "日期",
      barLabelProgress: "进度",
      restoreHintTitle: "PNG还原",
      restoreHintText: "仅原始导出的 PNG 可还原，截图或压缩图片可能失效。",
      duration: "工期",
      shiftSchedule: "整体顺延",
      appendTemplate: "插入标准阶段",
      insertTask: "下方插入",
      duplicateTask: "复制",
      taskList: "任务清单",
      taskHint: "编辑表格或拖动右侧任务条调整日期",
      phase: "阶段",
      owner: "负责人",
      start: "开始",
      end: "结束",
      progress: "进度",
      status: "状态",
      timeline: "甘特图",
      dragHint: "条身移动，左右边缘调整工期，按天吸附",
      legendDesign: "设计",
      legendSupply: "采购/加工",
      legendBuild: "装配/调试",
      legendRisk: "风险",
      saved: "已自动保存",
      imported: "CSV 已导入",
      exported: "文件已导出",
      restoredPng: "PNG 已还原为可编辑计划",
      invalidPng: "此 PNG 不包含可还原的甘特图数据",
      checksumMismatch: "PNG 数据校验失败，无法还原",
      shifted: "排期已整体调整",
      resetDone: "示例数据已重置",
      delete: "删除",
      invalidDate: "日期无效：结束日期不能早于开始日期",
      emptyImport: "CSV 没有可导入的任务",
      late: "任务晚于交期",
      sequence: "阶段开始顺序可能倒置",
      riskStatus: "存在风险状态任务",
      normalSummary: "排期正常",
      warningSummary: "发现 {count} 条提示",
      taskCount: "{count} 个任务",
      noTasks: "暂无任务",
      today: "今天",
      deliveryLine: "交期",
    },
    en: {
      appTitle: "Equipment Gantt",
      appSubtitle: "Custom equipment planning workbench",
      addTask: "Add",
      importCsv: "Import CSV",
      importPngRestore: "Restore PNG",
      exportCsv: "Export CSV",
      exportExcel: "Export Excel",
      exportPng: "Export PNG",
      previewReport: "Preview",
      previewTitle: "Customer Report Preview",
      previewHint: "This shows the actual exported PNG layout",
      downloadPreviewPng: "Download PNG",
      closePreview: "Close",
      resetSample: "Reset Sample",
      project: "Project",
      customer: "Customer",
      delivery: "Delivery",
      companyName: "Company",
      companyLogo: "Logo",
      chooseLogo: "Choose Logo",
      clearLogo: "Clear",
      logoReady: "Added",
      logoEmpty: "None",
      projectCode: "Project No.",
      reportVersion: "Version",
      updateDate: "Update Date",
      weekMode: "Week Mode",
      weekIso: "ISO Week",
      weekNatural: "Calendar Week",
      weekProject: "Project Week",
      barLabel: "Bar Text",
      barLabelNone: "None",
      barLabelPhase: "Phase",
      barLabelDates: "Dates",
      barLabelProgress: "Progress",
      restoreHintTitle: "PNG Restore",
      restoreHintText: "Only original exported PNG files can be restored; screenshots or compressed images may fail.",
      duration: "Duration",
      shiftSchedule: "Shift",
      appendTemplate: "Insert Template",
      insertTask: "Insert Below",
      duplicateTask: "Copy",
      taskList: "Task List",
      taskHint: "Edit the table or drag bars to reschedule",
      phase: "Phase",
      owner: "Owner",
      start: "Start",
      end: "End",
      progress: "Progress",
      status: "Status",
      timeline: "Gantt Chart",
      dragHint: "Move bars or resize edges; snaps by day",
      legendDesign: "Design",
      legendSupply: "Procurement/Machining",
      legendBuild: "Assembly/Debug",
      legendRisk: "Risk",
      saved: "Autosaved",
      imported: "CSV imported",
      exported: "File exported",
      restoredPng: "PNG restored as editable plan",
      invalidPng: "This PNG does not contain restorable Gantt data",
      checksumMismatch: "PNG data checksum failed; cannot restore",
      shifted: "Schedule shifted",
      resetDone: "Sample data reset",
      delete: "Delete",
      invalidDate: "Invalid date: end date cannot be earlier than start date",
      emptyImport: "No tasks found in CSV",
      late: "Task exceeds delivery date",
      sequence: "Phase start order may be reversed",
      riskStatus: "Risk status task exists",
      normalSummary: "Schedule looks normal",
      warningSummary: "{count} warning(s)",
      taskCount: "{count} tasks",
      noTasks: "No tasks",
      today: "Today",
      deliveryLine: "Delivery",
    },
  };

  const statusLabels = {
    zh: {
      not_started: "未开始",
      in_progress: "进行中",
      done: "已完成",
      risk: "风险",
    },
    en: {
      not_started: "Not started",
      in_progress: "In progress",
      done: "Done",
      risk: "Risk",
    },
  };

  const defaultTasks = [
    ["需求确认", "Requirements", "PM", "2026-07-01", "2026-07-04", 100, "done"],
    ["机械设计", "Mechanical Design", "ME", "2026-07-05", "2026-07-18", 70, "in_progress"],
    ["电气设计", "Electrical Design", "EE", "2026-07-19", "2026-07-26", 35, "in_progress"],
    ["采购", "Procurement", "Buyer", "2026-07-27", "2026-08-05", 15, "not_started"],
    ["加工", "Machining", "Vendor", "2026-08-06", "2026-08-18", 0, "not_started"],
    ["装配", "Assembly", "Assembly", "2026-08-19", "2026-08-27", 0, "not_started"],
    ["调试", "Debug", "Controls", "2026-08-28", "2026-09-04", 0, "not_started"],
    ["FAT验收", "FAT", "QA", "2026-09-05", "2026-09-07", 0, "not_started"],
    ["发货", "Shipment", "Logistics", "2026-09-08", "2026-09-09", 0, "not_started"],
  ];

  let state = loadState();
  let dragState = null;
  let dragTooltip = null;
  let toastTimer = null;
  let previewUrl = null;

  const els = {
    projectName: document.getElementById("projectName"),
    customerName: document.getElementById("customerName"),
    deliveryDate: document.getElementById("deliveryDate"),
    companyName: document.getElementById("companyName"),
    logoFile: document.getElementById("logoFile"),
    logoStatus: document.getElementById("logoStatus"),
    projectCode: document.getElementById("projectCode"),
    reportVersion: document.getElementById("reportVersion"),
    updateDate: document.getElementById("updateDate"),
    weekMode: document.getElementById("weekMode"),
    barLabelMode: document.getElementById("barLabelMode"),
    shiftDaysInput: document.getElementById("shiftDaysInput"),
    taskBody: document.getElementById("taskBody"),
    timelineGrid: document.getElementById("timelineGrid"),
    warnings: document.getElementById("warnings"),
    summaryText: document.getElementById("summaryText"),
    statusDot: document.getElementById("statusDot"),
    toast: document.getElementById("toast"),
    csvFile: document.getElementById("csvFile"),
    pngFile: document.getElementById("pngFile"),
    previewModal: document.getElementById("previewModal"),
    previewBackdrop: document.getElementById("previewBackdrop"),
    previewImage: document.getElementById("previewImage"),
  };

  init();

  function init() {
    document.querySelectorAll("[data-lang]").forEach((button) => {
      button.addEventListener("click", () => setLanguage(button.dataset.lang));
    });
    document.getElementById("addTaskBtn").addEventListener("click", addTask);
    document.getElementById("importBtn").addEventListener("click", () => els.csvFile.click());
    document.getElementById("importPngBtn").addEventListener("click", () => els.pngFile.click());
    document.getElementById("exportCsvBtn").addEventListener("click", exportCsvData);
    document.getElementById("exportExcelBtn").addEventListener("click", exportExcelReport);
    document.getElementById("exportPngBtn").addEventListener("click", exportPng);
    document.getElementById("previewReportBtn").addEventListener("click", showReportPreview);
    document.getElementById("previewDownloadBtn").addEventListener("click", exportPng);
    document.getElementById("previewCloseBtn").addEventListener("click", hideReportPreview);
    els.previewBackdrop.addEventListener("click", hideReportPreview);
    document.getElementById("resetBtn").addEventListener("click", resetSample);
    document.getElementById("shiftScheduleBtn").addEventListener("click", shiftSchedule);
    document.getElementById("appendTemplateBtn").addEventListener("click", appendDefaultTemplate);
    document.getElementById("logoBtn").addEventListener("click", () => els.logoFile.click());
    document.getElementById("clearLogoBtn").addEventListener("click", clearLogo);
    els.csvFile.addEventListener("change", importCsv);
    els.pngFile.addEventListener("change", importPngRestore);
    els.logoFile.addEventListener("change", importLogoFile);

    ["projectName", "customerName", "deliveryDate", "companyName", "projectCode", "reportVersion", "updateDate", "weekMode", "barLabelMode"].forEach((key) => {
      els[key].addEventListener("input", () => {
        state.project[key] = els[key].value;
        saveState();
        render();
      });
    });

    render();
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && Array.isArray(saved.tasks)) {
        return sanitizeState(saved);
      }
    } catch (error) {
      console.warn("Cannot load saved gantt state", error);
    }
    return makeSampleState();
  }

  function makeSampleState() {
    return {
      lang: "zh",
      project: {
        projectName: "SZ-2607 自动锁螺丝工作站",
        customerName: "Demo Customer",
        deliveryDate: "2026-09-12",
        companyName: "",
        logoDataUrl: "",
        logoName: "",
        projectCode: "SZ-2607",
        reportVersion: "V1",
        updateDate: toIso(new Date()),
        weekMode: "iso",
        barLabelMode: "none",
      },
      tasks: defaultTasks.map((row, index) => ({
        id: createId(),
        phase_zh: row[0],
        phase_en: row[1],
        owner: row[2],
        start: row[3],
        end: row[4],
        progress: row[5],
        status: row[6],
        order: index,
      })),
    };
  }

  function sanitizeState(input) {
    const sample = makeSampleState();
    return {
      lang: input.lang === "en" ? "en" : "zh",
      project: {
        projectName: input.project?.projectName || sample.project.projectName,
        customerName: input.project?.customerName || sample.project.customerName,
        deliveryDate: isDate(input.project?.deliveryDate) ? input.project.deliveryDate : sample.project.deliveryDate,
        companyName: String(input.project?.companyName || ""),
        logoDataUrl: typeof input.project?.logoDataUrl === "string" ? input.project.logoDataUrl : "",
        logoName: String(input.project?.logoName || ""),
        projectCode: String(input.project?.projectCode || ""),
        reportVersion: String(input.project?.reportVersion || sample.project.reportVersion),
        updateDate: isDate(input.project?.updateDate) ? input.project.updateDate : sample.project.updateDate,
        weekMode: ["iso", "natural", "project"].includes(input.project?.weekMode) ? input.project.weekMode : sample.project.weekMode,
        barLabelMode: ["none", "phase", "dates", "progress"].includes(input.project?.barLabelMode) ? input.project.barLabelMode : sample.project.barLabelMode,
      },
      tasks: input.tasks.map((task, index) => sanitizeTask(task, index)).filter(Boolean),
    };
  }

  function sanitizeTask(task, index) {
    const start = isDate(task.start) ? task.start : "2026-07-01";
    const end = isDate(task.end) && compareDate(task.end, start) >= 0 ? task.end : start;
    return {
      id: task.id || createId(),
      phase_zh: String(task.phase_zh || task.phase || "新任务"),
      phase_en: String(task.phase_en || task.phase || "New Task"),
      owner: String(task.owner || ""),
      start,
      end,
      progress: clamp(Number(task.progress) || 0, 0, 100),
      status: ["not_started", "in_progress", "done", "risk"].includes(task.status) ? task.status : "not_started",
      order: Number.isFinite(Number(task.order)) ? Number(task.order) : index,
    };
  }

  function setLanguage(lang) {
    state.lang = lang;
    saveState();
    render();
  }

  function render() {
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    document.querySelectorAll("[data-lang]").forEach((button) => {
      button.classList.toggle("active", button.dataset.lang === state.lang);
    });
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    els.projectName.value = state.project.projectName;
    els.customerName.value = state.project.customerName;
    els.deliveryDate.value = state.project.deliveryDate;
    els.companyName.value = state.project.companyName || "";
    els.logoStatus.textContent = state.project.logoDataUrl ? (state.project.logoName || t("logoReady")) : t("logoEmpty");
    els.projectCode.value = state.project.projectCode || "";
    els.reportVersion.value = state.project.reportVersion || "";
    els.updateDate.value = state.project.updateDate || "";
    els.weekMode.value = state.project.weekMode || "iso";
    els.barLabelMode.value = state.project.barLabelMode || "none";

    const warnings = getWarnings();
    renderSummary(warnings);
    renderTaskTable(warnings);
    renderTimeline(warnings);
  }

  function renderSummary(warnings) {
    const count = state.tasks.length;
    const summary = warnings.length ? t("warningSummary").replace("{count}", warnings.length) : t("normalSummary");
    els.summaryText.textContent = `${summary} · ${count ? t("taskCount").replace("{count}", count) : t("noTasks")}`;
    els.statusDot.style.background = warnings.length ? "var(--risk)" : "var(--build)";
  }

  function renderTaskTable(warnings) {
    const riskyIds = new Set(warnings.map((warning) => warning.id).filter(Boolean));
    const rows = sortedTasks().map((task) => {
      const tr = document.createElement("tr");
      tr.className = riskyIds.has(task.id) || task.status === "risk" ? "row-risk" : "";
      tr.dataset.id = task.id;
      tr.innerHTML = `
        <td><input data-field="phase" type="text" value="${escapeAttr(taskPhase(task))}" /></td>
        <td><input data-field="owner" type="text" value="${escapeAttr(task.owner)}" /></td>
        <td><input data-field="start" type="date" value="${task.start}" /></td>
        <td><input data-field="end" type="date" value="${task.end}" /></td>
        <td><input data-field="duration" type="number" min="1" value="${taskDuration(task)}" /></td>
        <td><input data-field="progress" type="number" min="0" max="100" value="${task.progress}" /></td>
        <td>${statusSelect(task.status)}</td>
        <td>
          <div class="row-actions">
            <button type="button" class="icon-btn insert-btn" title="${t("insertTask")}" aria-label="${t("insertTask")}">${plusIcon()}</button>
            <button type="button" class="icon-btn copy-btn" title="${t("duplicateTask")}" aria-label="${t("duplicateTask")}">${copyIcon()}</button>
            <button type="button" class="delete-btn" title="${t("delete")}" aria-label="${t("delete")}">${trashIcon()}</button>
          </div>
        </td>
      `;
      return tr;
    });

    els.taskBody.replaceChildren(...rows);
    els.taskBody.querySelectorAll("input, select").forEach((control) => {
      control.addEventListener("change", handleTaskEdit);
    });
    els.taskBody.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.closest("tr").dataset.id;
        state.tasks = state.tasks.filter((task) => task.id !== id);
        normalizeTaskOrder();
        saveState(true);
        render();
      });
    });
    els.taskBody.querySelectorAll(".insert-btn").forEach((button) => {
      button.addEventListener("click", () => {
        insertTaskAfter(button.closest("tr").dataset.id);
      });
    });
    els.taskBody.querySelectorAll(".copy-btn").forEach((button) => {
      button.addEventListener("click", () => {
        duplicateTask(button.closest("tr").dataset.id);
      });
    });
  }

  function statusSelect(current) {
    const options = ["not_started", "in_progress", "done", "risk"]
      .map((status) => `<option value="${status}" ${status === current ? "selected" : ""}>${statusLabels[state.lang][status]}</option>`)
      .join("");
    return `<select data-field="status">${options}</select>`;
  }

  function handleTaskEdit(event) {
    const row = event.target.closest("tr");
    const task = state.tasks.find((item) => item.id === row.dataset.id);
    if (!task) return;

    const field = event.target.dataset.field;
    const value = event.target.value;
    if (field === "phase") {
      if (state.lang === "zh") task.phase_zh = value;
      else task.phase_en = value;
    } else if (field === "progress") {
      task.progress = clamp(Number(value), 0, 100);
    } else if (field === "duration") {
      const duration = Math.max(1, Math.round(Number(value) || 1));
      task.end = toIso(addDays(parseDate(task.start), duration - 1));
    } else if (field === "start" || field === "end") {
      task[field] = value;
      if (!normalizeTaskDates(task)) {
        showToast(t("invalidDate"));
      }
    } else {
      task[field] = value;
    }

    saveState();
    render();
  }

  function renderTimeline(warnings) {
    const range = getRange();
    const days = daysBetween(range.start, range.end) + 1;
    const columns = `repeat(${days}, var(--day-w))`;
    const width = days * DAY_WIDTH;
    els.timelineGrid.style.width = `${Math.max(width, 640)}px`;

    const monthRow = document.createElement("div");
    monthRow.className = "axis-months";
    monthRow.style.gridTemplateColumns = columns;
    buildMonthCells(range.start, days).forEach((cell) => monthRow.appendChild(cell));

    const dayRow = document.createElement("div");
    dayRow.className = "axis-days";
    dayRow.style.gridTemplateColumns = columns;
    for (let i = 0; i < days; i += 1) {
      const date = addDays(range.start, i);
      const cell = document.createElement("div");
      cell.className = `axis-day${isWeekend(date) ? " weekend" : ""}`;
      cell.textContent = date.getDate();
      dayRow.appendChild(cell);
    }

    const lanes = document.createElement("div");
    lanes.className = "lanes";
    const riskyIds = new Set(warnings.map((warning) => warning.id).filter(Boolean));
    sortedTasks().forEach((task) => {
      const lane = document.createElement("div");
      lane.className = "lane";
      lane.style.gridTemplateColumns = columns;
      for (let i = 0; i < days; i += 1) {
        const date = addDays(range.start, i);
        const cell = document.createElement("div");
        cell.className = `day-cell${isWeekend(date) ? " weekend" : ""}`;
        lane.appendChild(cell);
      }
      const bar = buildBar(task, range.start, riskyIds.has(task.id));
      lane.appendChild(bar);
      lanes.appendChild(lane);
    });

    const today = stripTime(new Date());
    if (today >= range.start && today <= range.end) {
      lanes.appendChild(makeMarker("today-line", daysBetween(range.start, today) * DAY_WIDTH, t("today")));
    }
    const delivery = parseDate(state.project.deliveryDate);
    if (delivery && delivery >= range.start && delivery <= range.end) {
      lanes.appendChild(makeMarker("delivery-line", daysBetween(range.start, delivery) * DAY_WIDTH, t("deliveryLine")));
    }

    els.timelineGrid.replaceChildren(monthRow, dayRow, lanes);
    renderWarnings(warnings);
  }

  function buildMonthCells(start, days) {
    const cells = [];
    let index = 0;
    while (index < days) {
      const date = addDays(start, index);
      const month = date.getMonth();
      let span = 0;
      while (index + span < days && addDays(start, index + span).getMonth() === month) {
        span += 1;
      }
      const cell = document.createElement("div");
      cell.className = "axis-month";
      cell.style.gridColumn = `span ${span}`;
      cell.textContent = date.toLocaleDateString(state.lang === "zh" ? "zh-CN" : "en-US", {
        year: "numeric",
        month: "short",
      });
      cells.push(cell);
      index += span;
    }
    return cells;
  }

  function buildBar(task, rangeStart, risky) {
    const startOffset = daysBetween(rangeStart, parseDate(task.start));
    const duration = daysBetween(parseDate(task.start), parseDate(task.end)) + 1;
    const bar = document.createElement("div");
    const type = risky || task.status === "risk" ? "risk" : taskType(task);
    bar.className = `gantt-bar ${type}`;
    bar.dataset.id = task.id;
    bar.style.left = `${startOffset * DAY_WIDTH}px`;
    bar.style.width = `${Math.max(duration * DAY_WIDTH, 18)}px`;
    bar.title = `${taskPhase(task)} · ${task.start} - ${task.end}`;
    bar.innerHTML = `
      <span class="bar-progress" style="width:${clamp(task.progress, 0, 100)}%"></span>
      <span class="resize-handle left" data-drag-mode="resize-left"></span>
      <span class="bar-label">${escapeHtml(taskPhase(task))}</span>
      <span class="resize-handle right" data-drag-mode="resize-right"></span>
    `;
    bar.addEventListener("pointerdown", startDrag);
    return bar;
  }

  function makeMarker(className, left, label) {
    const marker = document.createElement("div");
    marker.className = className;
    marker.style.left = `${left}px`;
    marker.title = label;
    return marker;
  }

  function renderWarnings(warnings) {
    if (!warnings.length) {
      els.warnings.hidden = true;
      els.warnings.textContent = "";
      return;
    }
    els.warnings.hidden = false;
    els.warnings.innerHTML = warnings
      .map((warning) => `<div>${escapeHtml(warning.message)}</div>`)
      .join("");
  }

  function startDrag(event) {
    if (event.button !== 0) return;
    event.preventDefault();
    const bar = event.currentTarget;
    const task = state.tasks.find((item) => item.id === bar.dataset.id);
    if (!task) return;

    const targetMode = event.target.dataset.dragMode;
    dragState = {
      id: task.id,
      mode: targetMode || "move",
      originX: event.clientX,
      startDate: task.start,
      endDate: task.end,
      startLeft: parseFloat(bar.style.left),
      startWidth: parseFloat(bar.style.width),
    };
    bar.classList.add("dragging");
    updateDragTooltip(event, task);
    window.addEventListener("pointermove", onDrag);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
  }

  function onDrag(event) {
    if (!dragState) return;
    const task = state.tasks.find((item) => item.id === dragState.id);
    if (!task) return;

    const deltaDays = Math.round((event.clientX - dragState.originX) / DAY_WIDTH);
    const start = parseDate(dragState.startDate);
    const end = parseDate(dragState.endDate);
    if (dragState.mode === "move") {
      task.start = toIso(addDays(start, deltaDays));
      task.end = toIso(addDays(end, deltaDays));
    } else if (dragState.mode === "resize-left") {
      const nextStart = addDays(start, deltaDays);
      if (nextStart <= end) task.start = toIso(nextStart);
    } else if (dragState.mode === "resize-right") {
      const nextEnd = addDays(end, deltaDays);
      if (nextEnd >= start) task.end = toIso(nextEnd);
    }
    saveState();
    render();
    updateDragTooltip(event, task);
  }

  function endDrag(event) {
    event.preventDefault();
    window.removeEventListener("pointermove", onDrag);
    window.removeEventListener("pointerup", endDrag);
    window.removeEventListener("pointercancel", endDrag);
    hideDragTooltip();
    dragState = null;
    showToast(t("saved"));
  }

  function updateDragTooltip(event, task) {
    if (!dragTooltip) {
      dragTooltip = document.createElement("div");
      dragTooltip.className = "drag-tooltip";
      document.body.appendChild(dragTooltip);
    }
    dragTooltip.textContent = `${task.start} ~ ${task.end}`;
    dragTooltip.style.left = `${event.clientX + 12}px`;
    dragTooltip.style.top = `${event.clientY - 34}px`;
  }

  function hideDragTooltip() {
    if (!dragTooltip) return;
    dragTooltip.remove();
    dragTooltip = null;
  }

  function addTask() {
    const last = state.tasks[state.tasks.length - 1];
    const start = last ? addDays(parseDate(last.end), 1) : stripTime(new Date());
    const end = addDays(start, 4);
    state.tasks.push({
      id: createId(),
      phase_zh: "新任务",
      phase_en: "New Task",
      owner: "",
      start: toIso(start),
      end: toIso(end),
      progress: 0,
      status: "not_started",
      order: state.tasks.length,
    });
    saveState(true);
    render();
  }

  function insertTaskAfter(id) {
    const sorted = state.tasks.slice().sort((a, b) => a.order - b.order);
    const index = sorted.findIndex((task) => task.id === id);
    const base = sorted[index] || sorted[sorted.length - 1];
    const start = base ? addDays(parseDate(base.end), 1) : stripTime(new Date());
    const task = {
      id: createId(),
      phase_zh: "新任务",
      phase_en: "New Task",
      owner: "",
      start: toIso(start),
      end: toIso(addDays(start, 4)),
      progress: 0,
      status: "not_started",
      order: index >= 0 ? base.order + 0.5 : state.tasks.length,
    };
    state.tasks.push(task);
    normalizeTaskOrder();
    saveState(true);
    render();
  }

  function duplicateTask(id) {
    const source = state.tasks.find((task) => task.id === id);
    if (!source) return;
    state.tasks.push({
      ...source,
      id: createId(),
      phase_zh: `${source.phase_zh} 副本`,
      phase_en: `${source.phase_en} Copy`,
      order: source.order + 0.5,
    });
    normalizeTaskOrder();
    saveState(true);
    render();
  }

  function normalizeTaskOrder() {
    state.tasks
      .slice()
      .sort((a, b) => a.order - b.order || compareDate(a.start, b.start))
      .forEach((task, index) => {
        task.order = index;
      });
  }

  function shiftSchedule() {
    const days = Math.round(Number(els.shiftDaysInput.value) || 0);
    if (!days) return;
    state.tasks.forEach((task) => {
      task.start = toIso(addDays(parseDate(task.start), days));
      task.end = toIso(addDays(parseDate(task.end), days));
    });
    if (isDate(state.project.deliveryDate)) {
      state.project.deliveryDate = toIso(addDays(parseDate(state.project.deliveryDate), days));
    }
    saveState(true);
    render();
    showToast(t("shifted"));
  }

  function appendDefaultTemplate() {
    const latestEnd = state.tasks.reduce((latest, task) => {
      const end = parseDate(task.end);
      return !latest || end > latest ? end : latest;
    }, null);
    let cursor = latestEnd ? addDays(latestEnd, 1) : stripTime(new Date());
    const baseOrder = state.tasks.length
      ? Math.max(...state.tasks.map((task) => Number(task.order) || 0)) + 1
      : 0;

    defaultTasks.forEach((row, index) => {
      const duration = daysBetween(parseDate(row[3]), parseDate(row[4])) + 1;
      const start = stripTime(cursor);
      const end = addDays(start, duration - 1);
      state.tasks.push({
        id: createId(),
        phase_zh: row[0],
        phase_en: row[1],
        owner: row[2],
        start: toIso(start),
        end: toIso(end),
        progress: 0,
        status: "not_started",
        order: baseOrder + index,
      });
      cursor = addDays(end, 1);
    });

    normalizeTaskOrder();
    saveState(true);
    render();
  }

  function resetSample() {
    state = makeSampleState();
    saveState(true);
    render();
    showToast(t("resetDone"));
  }

  function getWarnings() {
    const warnings = [];
    const delivery = parseDate(state.project.deliveryDate);
    state.tasks.forEach((task) => {
      if (delivery && parseDate(task.end) > delivery) {
        warnings.push({ id: task.id, message: `${taskPhase(task)}: ${t("late")}` });
      }
      if (task.status === "risk") {
        warnings.push({ id: task.id, message: `${taskPhase(task)}: ${t("riskStatus")}` });
      }
    });

    const byOrder = state.tasks.slice().sort((a, b) => a.order - b.order);
    for (let i = 1; i < byOrder.length; i += 1) {
      const prev = byOrder[i - 1];
      const task = byOrder[i];
      if (parseDate(task.start) < parseDate(prev.start)) {
        warnings.push({ id: task.id, message: `${taskPhase(task)}: ${t("sequence")}` });
      }
    }
    return warnings;
  }

  function taskType(task) {
    const text = `${task.phase_zh} ${task.phase_en}`.toLowerCase();
    if (/采购|加工|procurement|machining/.test(text)) return "supply";
    if (/装配|调试|验收|发货|assembly|debug|fat|shipment/.test(text)) return "build";
    return "design";
  }

  function taskPhase(task) {
    return state.lang === "zh" ? task.phase_zh : task.phase_en;
  }

  function taskDuration(task) {
    return daysBetween(parseDate(task.start), parseDate(task.end)) + 1;
  }

  function taskBarLabel(task) {
    const mode = state.project.barLabelMode || "none";
    if (mode === "phase") return taskPhase(task);
    if (mode === "dates") return `${task.start.slice(5)}~${task.end.slice(5)}`;
    if (mode === "progress") return `${clamp(task.progress, 0, 100)}%`;
    return "";
  }

  function sortedTasks() {
    return state.tasks.slice().sort((a, b) => {
      const dateCompare = compareDate(a.start, b.start);
      return dateCompare || a.order - b.order;
    });
  }

  function getRange() {
    const dates = state.tasks.flatMap((task) => [parseDate(task.start), parseDate(task.end)]);
    const delivery = parseDate(state.project.deliveryDate);
    if (delivery) dates.push(delivery);
    const valid = dates.filter(Boolean);
    const start = valid.length ? new Date(Math.min(...valid)) : stripTime(new Date());
    const end = valid.length ? new Date(Math.max(...valid)) : addDays(start, 30);
    return {
      start: addDays(start, -3),
      end: addDays(end, 5),
    };
  }

  function getReportRange(tasks) {
    const dates = tasks.flatMap((task) => [parseDate(task.start), parseDate(task.end)]);
    const delivery = parseDate(state.project.deliveryDate);
    if (delivery) dates.push(delivery);
    const valid = dates.filter(Boolean);
    const start = valid.length ? new Date(Math.min(...valid)) : stripTime(new Date());
    const end = valid.length ? new Date(Math.max(...valid)) : addDays(start, 30);
    return {
      start: startOfIsoWeek(start),
      end: endOfIsoWeek(end),
    };
  }

  function getWeeksInRange(range) {
    const weeks = [];
    let cursor = startOfIsoWeek(range.start);
    while (cursor <= range.end) {
      const weekStart = stripTime(cursor);
      const weekEnd = addDays(weekStart, 6);
      weeks.push({
        start: weekStart,
        end: weekEnd,
        label: getWeekDisplayLabel(weekStart, weeks.length, range.start),
        month: weekStart.getMonth(),
        monthLabel: weekStart.toLocaleDateString(state.lang === "zh" ? "zh-CN" : "en-US", {
          year: "numeric",
          month: "short",
        }),
        rangeLabel: `${toIso(weekStart).slice(5)}-${toIso(weekEnd).slice(5)}`,
      });
      cursor = addDays(cursor, 7);
    }
    return weeks;
  }

  function getWeekDisplayLabel(date, index, rangeStart) {
    const mode = state.project.weekMode || "iso";
    if (mode === "project") return `PW${index + 1}`;
    if (mode === "natural") return `CW${String(getNaturalWeek(date)).padStart(2, "0")}`;
    return `W${String(getIsoWeek(date)).padStart(2, "0")}`;
  }

  function getNaturalWeek(date) {
    const yearStart = new Date(date.getFullYear(), 0, 1);
    return Math.floor(daysBetween(yearStart, stripTime(date)) / 7) + 1;
  }

  function reportProjectTitle() {
    return [state.project.projectCode, state.project.projectName].filter(Boolean).join(" · ") || "-";
  }

  function reportMetaParts() {
    const parts = [];
    if (state.project.companyName) parts.push(state.project.companyName);
    if (state.project.customerName) parts.push(`${t("customer")}: ${state.project.customerName}`);
    if (state.project.reportVersion) parts.push(`${t("reportVersion")}: ${state.project.reportVersion}`);
    if (state.project.updateDate) parts.push(`${t("updateDate")}: ${state.project.updateDate}`);
    return parts;
  }

  function reportMetaText() {
    return reportMetaParts().join(" · ") || "-";
  }

  function getMonthSpans(weeks) {
    const spans = [];
    weeks.forEach((week) => {
      const last = spans[spans.length - 1];
      if (last && last.month === week.month && last.label === week.monthLabel) {
        last.span += 1;
      } else {
        spans.push({ month: week.month, label: week.monthLabel, span: 1 });
      }
    });
    return spans;
  }

  function startOfIsoWeek(date) {
    const result = stripTime(date);
    const day = result.getDay() || 7;
    result.setDate(result.getDate() - day + 1);
    return result;
  }

  function endOfIsoWeek(date) {
    return addDays(startOfIsoWeek(date), 6);
  }

  function rangesOverlap(startA, endA, startB, endB) {
    return startA <= endB && endA >= startB;
  }

  function normalizeTaskDates(task) {
    if (!isDate(task.start)) task.start = toIso(stripTime(new Date()));
    if (!isDate(task.end)) task.end = task.start;
    if (compareDate(task.end, task.start) < 0) {
      task.end = task.start;
      return false;
    }
    return true;
  }

  function exportExcelReport() {
    const workbook = buildXlsxReportBlob();
    downloadBlob(workbook, buildExportFilename("xlsx"), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    showToast(t("exported"));
  }

  function exportCsvData() {
    const header = ["phase_zh", "phase_en", "owner", "start", "end", "progress", "status"];
    const rows = sortedTasks().map((task) =>
      header.map((field) => csvEscape(task[field])).join(",")
    );
    const csv = `\ufeff${header.join(",")}\n${rows.join("\n")}`;
    downloadBlob(csv, buildExportFilename("csv"), "text/csv;charset=utf-8");
    showToast(t("exported"));
  }

  function buildXlsxReportBlob() {
    const tasks = sortedTasks();
    const range = getReportRange(tasks);
    const weeks = getWeeksInRange(range);
    const months = getMonthSpans(weeks);
    const overall = calculateOverallProgress(tasks);
    const periodText = getSchedulePeriod(tasks);
    const delivery = parseDate(state.project.deliveryDate);
    const latestEnd = tasks.reduce((latest, task) => {
      const end = parseDate(task.end);
      return !latest || end > latest ? end : latest;
    }, null);
    const onSchedule = !delivery || !latestEnd || latestEnd <= delivery;
    const reportTitle = state.lang === "zh" ? "客户项目进度汇报" : "Customer Schedule Report";
    const statusText = state.lang === "zh"
      ? (onSchedule ? "按计划推进" : "交期需关注")
      : (onSchedule ? "On schedule" : "Delivery attention");
    const generatedLabel = state.lang === "zh" ? "生成时间" : "Generated";
    const labels = {
      schedule: state.lang === "zh" ? "计划日期" : "Schedule",
      period: state.lang === "zh" ? "项目周期" : "Schedule Period",
      overall: state.lang === "zh" ? "总体进度" : "Overall Progress",
      status: state.lang === "zh" ? "计划状态" : "Schedule Status",
      design: state.lang === "zh" ? "设计阶段" : "Design",
      supply: state.lang === "zh" ? "采购/加工" : "Procurement/Machining",
      build: state.lang === "zh" ? "装配/验收/发货" : "Assembly/Acceptance/Shipment",
    };
    const minColumnCount = 11;
    const columnCount = Math.max(minColumnCount, 3 + weeks.length);
    const lastColumn = columnName(columnCount);
    const rows = [];
    const merges = [
      `A1:${lastColumn}1`,
      "A2:C2", "A3:C3",
      "D2:E2", "D3:E3",
      "F2:G2", "F3:G3",
      "H2:I2", "H3:I3",
      "J2:K2", "J3:K3",
      "A5:A6", "B5:B6", "C5:C6",
    ];

    rows.push(xlsxRow(1, [
      xlsxTextCell(1, 1, reportTitle, 1),
    ], 30));
    rows.push(xlsxRow(2, [
      xlsxTextCell(2, 1, reportProjectTitle(), 2),
      xlsxTextCell(2, 4, t("delivery"), 4),
      xlsxTextCell(2, 6, labels.overall, 4),
      xlsxTextCell(2, 8, labels.period, 4),
      xlsxTextCell(2, 10, labels.status, 4),
    ], 22));
    rows.push(xlsxRow(3, [
      xlsxTextCell(3, 1, reportMetaText(), 3),
      xlsxTextCell(3, 4, state.project.deliveryDate || "-", 5),
      xlsxTextCell(3, 6, `${overall}%`, 5),
      xlsxTextCell(3, 8, periodText, 5),
      xlsxTextCell(3, 10, statusText, onSchedule ? 5 : 19),
    ], 24));
    rows.push(xlsxRow(4, [], 8));

    const headerCells = [
      xlsxTextCell(5, 1, t("phase"), 6),
      xlsxTextCell(5, 2, labels.schedule, 6),
      xlsxTextCell(5, 3, t("progress"), 6),
    ];
    let monthOffset = 0;
    months.forEach((month) => {
      const startCol = 4 + monthOffset;
      const endCol = startCol + month.span - 1;
      headerCells.push(xlsxTextCell(5, startCol, month.label, 7));
      if (month.span > 1) merges.push(`${columnName(startCol)}5:${columnName(endCol)}5`);
      monthOffset += month.span;
    });
    rows.push(xlsxRow(5, headerCells, 22));

    const weekCells = weeks.map((week, index) =>
      xlsxTextCell(6, 4 + index, `${week.label}\n${week.rangeLabel}`, 8)
    );
    rows.push(xlsxRow(6, weekCells, 32));

    tasks.forEach((task, index) => {
      const rowNumber = 7 + index;
      const cells = [
        xlsxTextCell(rowNumber, 1, taskPhase(task), 9),
        xlsxTextCell(rowNumber, 2, `${task.start.slice(5)} ~ ${task.end.slice(5)}`, 10),
        xlsxTextCell(rowNumber, 3, `${clamp(task.progress, 0, 100)}%`, 11),
      ];
      weeks.forEach((week, weekIndex) => {
        const active = rangesOverlap(parseDate(task.start), parseDate(task.end), week.start, week.end);
        cells.push(xlsxBlankCell(rowNumber, 4 + weekIndex, active ? styleForTaskType(taskType(task)) : 12));
      });
      rows.push(xlsxRow(rowNumber, cells, 22));
    });

    const legendRow = 8 + tasks.length;
    rows.push(xlsxRow(legendRow - 1, [], 8));
    rows.push(xlsxRow(legendRow, [
      xlsxBlankCell(legendRow, 1, 13),
      xlsxTextCell(legendRow, 2, labels.design, 17),
      xlsxBlankCell(legendRow, 4, 14),
      xlsxTextCell(legendRow, 5, labels.supply, 17),
      xlsxBlankCell(legendRow, 7, 15),
      xlsxTextCell(legendRow, 8, labels.build, 17),
    ], 22));
    rows.push(xlsxRow(legendRow + 1, [
      xlsxTextCell(legendRow + 1, 1, `${t("taskCount").replace("{count}", tasks.length)} · ${generatedLabel} ${new Date().toLocaleString()}`, 18),
    ], 22));
    merges.push(`A${legendRow + 1}:${lastColumn}${legendRow + 1}`);

    const worksheet = buildWorksheetXml(rows.join(""), merges, columnCount, legendRow + 1);
    const rawWorksheet = buildRawDataWorksheetXml(tasks);
    const files = [
      { name: "[Content_Types].xml", content: xlsxContentTypesXml() },
      { name: "_rels/.rels", content: xlsxRootRelsXml() },
      { name: "docProps/app.xml", content: xlsxAppXml() },
      { name: "docProps/core.xml", content: xlsxCoreXml() },
      { name: "xl/workbook.xml", content: xlsxWorkbookXml() },
      { name: "xl/_rels/workbook.xml.rels", content: xlsxWorkbookRelsXml() },
      { name: "xl/styles.xml", content: xlsxStylesXml() },
      { name: "xl/worksheets/sheet1.xml", content: worksheet },
      { name: "xl/worksheets/sheet2.xml", content: rawWorksheet },
    ];
    return makeZipBlob(files, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  }

  function buildExcelReportHtml() {
    const tasks = sortedTasks();
    const range = getReportRange(tasks);
    const weeks = getWeeksInRange(range);
    const months = getMonthSpans(weeks);
    const overall = calculateOverallProgress(tasks);
    const periodText = getSchedulePeriod(tasks);
    const delivery = parseDate(state.project.deliveryDate);
    const latestEnd = tasks.reduce((latest, task) => {
      const end = parseDate(task.end);
      return !latest || end > latest ? end : latest;
    }, null);
    const onSchedule = !delivery || !latestEnd || latestEnd <= delivery;
    const reportTitle = state.lang === "zh" ? "客户项目进度汇报" : "Customer Schedule Report";
    const statusText = state.lang === "zh"
      ? (onSchedule ? "按计划推进" : "交期需关注")
      : (onSchedule ? "On schedule" : "Delivery attention");
    const scheduleLabel = state.lang === "zh" ? "计划日期" : "Schedule";
    const periodLabel = state.lang === "zh" ? "项目周期" : "Schedule Period";
    const overallLabel = state.lang === "zh" ? "总体进度" : "Overall Progress";
    const statusLabel = state.lang === "zh" ? "计划状态" : "Schedule Status";
    const generatedLabel = state.lang === "zh" ? "生成时间" : "Generated";
    const monthRow = months.map((month) => `<th class="month" colspan="${month.span}">${excelEscape(month.label)}</th>`).join("");
    const weekRow = weeks.map((week) => `<th class="week">${excelEscape(week.label)}<br><span>${excelEscape(week.rangeLabel)}</span></th>`).join("");
    const taskRows = tasks.map((task) => {
      const type = taskType(task);
      const cells = weeks.map((week) => {
        const active = rangesOverlap(parseDate(task.start), parseDate(task.end), week.start, week.end);
        const cls = active ? `bar ${type}` : "grid";
        return `<td class="${cls}">${active ? "&nbsp;" : ""}</td>`;
      }).join("");
      return `
        <tr>
          <td class="phase">${excelEscape(taskPhase(task))}</td>
          <td class="schedule">${excelEscape(`${task.start.slice(5)} ~ ${task.end.slice(5)}`)}</td>
          <td class="progress">${clamp(task.progress, 0, 100)}%</td>
          ${cells}
        </tr>`;
    }).join("");
    const columnCount = 3 + weeks.length;
    return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    table { border-collapse: collapse; font-family: "Microsoft YaHei", "Segoe UI", Arial, sans-serif; color: #172033; }
    td, th { border: 1px solid #dbe3ee; padding: 6px 8px; font-size: 11pt; }
    .title { font-size: 20pt; font-weight: 700; border: 0; padding: 12px 8px 4px; }
    .project { font-size: 12pt; font-weight: 700; border: 0; padding: 2px 8px 8px; }
    .meta { color: #667085; border: 0; padding: 2px 8px 12px; }
    .metric-label { background: #f6f8fb; color: #667085; font-size: 9pt; text-align: center; font-weight: 700; }
    .metric-value { background: #ffffff; font-size: 12pt; text-align: center; font-weight: 700; }
    .spacer td { border: 0; height: 8px; }
    .head-left { background: #f2f6fb; color: #526078; font-weight: 700; text-align: left; }
    .month { background: #eef4fb; color: #526078; font-weight: 700; text-align: left; }
    .week { background: #f7faff; color: #526078; font-weight: 700; text-align: center; width: 58px; }
    .week span { color: #7b8799; font-size: 8pt; font-weight: 400; }
    .phase { width: 130px; font-weight: 700; }
    .schedule { width: 105px; color: #526078; text-align: center; }
    .progress { width: 70px; color: #526078; text-align: center; }
    .grid { background: #ffffff; width: 58px; }
    .bar { width: 58px; border-left-color: #ffffff; border-right-color: #ffffff; }
    .design { background: #2f6fed; }
    .supply { background: #d88916; }
    .build { background: #1f9d64; }
    .risk { background: #d14343; }
    .legend-label { border: 0; color: #526078; font-size: 10pt; padding-top: 12px; }
    .legend-chip { border: 0; width: 18px; }
    .foot { border: 0; color: #667085; font-size: 9pt; padding-top: 8px; }
  </style>
</head>
<body>
  <table>
    <colgroup>
      <col style="width:130px">
      <col style="width:105px">
      <col style="width:70px">
      ${weeks.map(() => '<col style="width:58px">').join("")}
    </colgroup>
    <tr><td class="title" colspan="${columnCount}">${excelEscape(reportTitle)}</td></tr>
    <tr><td class="project" colspan="3">${excelEscape(reportProjectTitle())}</td><td class="metric-label" colspan="2">${excelEscape(t("delivery"))}</td><td class="metric-label" colspan="2">${excelEscape(overallLabel)}</td><td class="metric-label" colspan="2">${excelEscape(periodLabel)}</td><td class="metric-label" colspan="2">${excelEscape(statusLabel)}</td></tr>
    <tr><td class="meta" colspan="3">${excelEscape(reportMetaText())}</td><td class="metric-value" colspan="2">${excelEscape(state.project.deliveryDate || "-")}</td><td class="metric-value" colspan="2">${overall}%</td><td class="metric-value" colspan="2">${excelEscape(periodText)}</td><td class="metric-value" colspan="2">${excelEscape(statusText)}</td></tr>
    <tr class="spacer"><td colspan="${columnCount}"></td></tr>
    <tr>
      <th class="head-left" rowspan="2">${excelEscape(t("phase"))}</th>
      <th class="head-left" rowspan="2">${excelEscape(scheduleLabel)}</th>
      <th class="head-left" rowspan="2">${excelEscape(t("progress"))}</th>
      ${monthRow}
    </tr>
    <tr>${weekRow}</tr>
    ${taskRows}
    <tr class="spacer"><td colspan="${columnCount}"></td></tr>
    <tr>
      <td class="legend-chip design">&nbsp;</td><td class="legend-label">${excelEscape(state.lang === "zh" ? "设计阶段" : "Design")}</td>
      <td class="legend-chip supply">&nbsp;</td><td class="legend-label" colspan="2">${excelEscape(state.lang === "zh" ? "采购/加工" : "Procurement/Machining")}</td>
      <td class="legend-chip build">&nbsp;</td><td class="legend-label" colspan="3">${excelEscape(state.lang === "zh" ? "装配/验收/发货" : "Assembly/Acceptance/Shipment")}</td>
    </tr>
    <tr><td class="foot" colspan="${columnCount}">${excelEscape(`${t("taskCount").replace("{count}", tasks.length)} · ${generatedLabel} ${new Date().toLocaleString()}`)}</td></tr>
  </table>
</body>
</html>`;
  }

  function buildWorksheetXml(rowsXml, merges, columnCount, rowCount) {
    const lastCell = `${columnName(columnCount)}${rowCount}`;
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <dimension ref="A1:${lastCell}"/>
  <sheetViews><sheetView workbookViewId="0" showGridLines="0"/></sheetViews>
  <sheetFormatPr defaultRowHeight="18"/>
  <cols>
    <col min="1" max="1" width="18" customWidth="1"/>
    <col min="2" max="2" width="16" customWidth="1"/>
    <col min="3" max="3" width="10" customWidth="1"/>
    <col min="4" max="${columnCount}" width="8.5" customWidth="1"/>
  </cols>
  <sheetData>${rowsXml}</sheetData>
  <mergeCells count="${merges.length}">${merges.map((ref) => `<mergeCell ref="${ref}"/>`).join("")}</mergeCells>
  <pageMargins left="0.3" right="0.3" top="0.5" bottom="0.5" header="0.2" footer="0.2"/>
</worksheet>`;
  }

  function buildRawDataWorksheetXml(tasks) {
    const header = ["phase_zh", "phase_en", "owner", "start", "end", "progress", "status", "order"];
    const rows = [];
    rows.push(xlsxRow(1, [xlsxTextCell(1, 1, state.lang === "zh" ? "原始数据" : "Raw Data", 1)], 28));
    rows.push(xlsxRow(2, [
      xlsxTextCell(2, 1, t("project"), 6),
      xlsxTextCell(2, 2, state.project.projectName, 9),
      xlsxTextCell(2, 3, t("customer"), 6),
      xlsxTextCell(2, 4, state.project.customerName, 9),
      xlsxTextCell(2, 5, t("delivery"), 6),
      xlsxTextCell(2, 6, state.project.deliveryDate, 10),
      xlsxTextCell(2, 7, "lang", 6),
      xlsxTextCell(2, 8, state.lang, 10),
    ], 22));
    rows.push(xlsxRow(3, [
      xlsxTextCell(3, 1, t("companyName"), 6),
      xlsxTextCell(3, 2, state.project.companyName || "", 9),
      xlsxTextCell(3, 3, t("projectCode"), 6),
      xlsxTextCell(3, 4, state.project.projectCode || "", 9),
      xlsxTextCell(3, 5, t("reportVersion"), 6),
      xlsxTextCell(3, 6, state.project.reportVersion || "", 10),
      xlsxTextCell(3, 7, t("updateDate"), 6),
      xlsxTextCell(3, 8, state.project.updateDate || "", 10),
    ], 22));
    rows.push(xlsxRow(4, [], 8));
    rows.push(xlsxRow(5, header.map((name, index) => xlsxTextCell(5, index + 1, name, 6)), 22));
    tasks.forEach((task, index) => {
      const rowNumber = 6 + index;
      rows.push(xlsxRow(rowNumber, [
        xlsxTextCell(rowNumber, 1, task.phase_zh, 9),
        xlsxTextCell(rowNumber, 2, task.phase_en, 9),
        xlsxTextCell(rowNumber, 3, task.owner, 10),
        xlsxTextCell(rowNumber, 4, task.start, 10),
        xlsxTextCell(rowNumber, 5, task.end, 10),
        xlsxTextCell(rowNumber, 6, String(clamp(task.progress, 0, 100)), 11),
        xlsxTextCell(rowNumber, 7, task.status, 10),
        xlsxTextCell(rowNumber, 8, String(task.order ?? index), 11),
      ], 22));
    });
    const rowCount = Math.max(6, tasks.length + 5);
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <dimension ref="A1:H${rowCount}"/>
  <sheetViews><sheetView workbookViewId="0"/></sheetViews>
  <sheetFormatPr defaultRowHeight="18"/>
  <cols>
    <col min="1" max="2" width="22" customWidth="1"/>
    <col min="3" max="3" width="14" customWidth="1"/>
    <col min="4" max="5" width="14" customWidth="1"/>
    <col min="6" max="8" width="12" customWidth="1"/>
  </cols>
  <sheetData>${rows.join("")}</sheetData>
  <mergeCells count="1"><mergeCell ref="A1:H1"/></mergeCells>
  <pageMargins left="0.3" right="0.3" top="0.5" bottom="0.5" header="0.2" footer="0.2"/>
</worksheet>`;
  }

  function xlsxRow(rowNumber, cells, height) {
    return `<row r="${rowNumber}" ht="${height}" customHeight="1">${cells.join("")}</row>`;
  }

  function xlsxTextCell(row, col, value, style) {
    return `<c r="${columnName(col)}${row}" s="${style}" t="inlineStr"><is><t xml:space="preserve">${xmlEscape(value)}</t></is></c>`;
  }

  function xlsxBlankCell(row, col, style) {
    return `<c r="${columnName(col)}${row}" s="${style}"/>`;
  }

  function styleForTaskType(type) {
    return { design: 13, supply: 14, build: 15, risk: 16 }[type] || 13;
  }

  function xlsxContentTypesXml() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`;
  }

  function xlsxRootRelsXml() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`;
  }

  function xlsxWorkbookXml() {
    const sheetName = state.lang === "zh" ? "客户汇报" : "Customer Report";
    const rawSheetName = state.lang === "zh" ? "原始数据" : "Raw Data";
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <bookViews><workbookView xWindow="0" yWindow="0" windowWidth="18000" windowHeight="11000"/></bookViews>
  <sheets>
    <sheet name="${xmlEscape(sheetName)}" sheetId="1" r:id="rId1"/>
    <sheet name="${xmlEscape(rawSheetName)}" sheetId="2" r:id="rId2"/>
  </sheets>
</workbook>`;
  }

  function xlsxWorkbookRelsXml() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`;
  }

  function xlsxAppXml() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Equipment Gantt</Application>
</Properties>`;
  }

  function xlsxCoreXml() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>${xmlEscape(state.lang === "zh" ? "客户项目进度汇报" : "Customer Schedule Report")}</dc:title>
  <dc:creator>Equipment Gantt</dc:creator>
  <dcterms:created xsi:type="dcterms:W3CDTF">${new Date().toISOString()}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">${new Date().toISOString()}</dcterms:modified>
</cp:coreProperties>`;
  }

  function xlsxStylesXml() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="8">
    <font><sz val="11"/><color rgb="FF172033"/><name val="Microsoft YaHei"/></font>
    <font><b/><sz val="20"/><color rgb="FF172033"/><name val="Microsoft YaHei"/></font>
    <font><b/><sz val="12"/><color rgb="FF172033"/><name val="Microsoft YaHei"/></font>
    <font><sz val="10"/><color rgb="FF667085"/><name val="Microsoft YaHei"/></font>
    <font><b/><sz val="12"/><color rgb="FF172033"/><name val="Microsoft YaHei"/></font>
    <font><b/><sz val="10"/><color rgb="FF526078"/><name val="Microsoft YaHei"/></font>
    <font><sz val="9"/><color rgb="FF667085"/><name val="Microsoft YaHei"/></font>
    <font><b/><sz val="12"/><color rgb="FFD88916"/><name val="Microsoft YaHei"/></font>
  </fonts>
  <fills count="12">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFF2F6FB"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFF6F8FB"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFEEF4FB"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFF7FAFF"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFFFFFF"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF2F6FED"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFD88916"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FF1F9D64"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFD14343"/><bgColor indexed="64"/></patternFill></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFFF7E8"/><bgColor indexed="64"/></patternFill></fill>
  </fills>
  <borders count="3">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    <border><left style="thin"><color rgb="FFDDE5EF"/></left><right style="thin"><color rgb="FFDDE5EF"/></right><top style="thin"><color rgb="FFDDE5EF"/></top><bottom style="thin"><color rgb="FFDDE5EF"/></bottom><diagonal/></border>
    <border><left/><right/><top/><bottom/><diagonal/></border>
  </borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="20">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
    <xf numFmtId="0" fontId="1" fillId="0" borderId="2" applyFont="1"><alignment vertical="center"/></xf>
    <xf numFmtId="0" fontId="2" fillId="0" borderId="2" applyFont="1"><alignment vertical="center"/></xf>
    <xf numFmtId="0" fontId="3" fillId="0" borderId="2" applyFont="1"><alignment vertical="center"/></xf>
    <xf numFmtId="0" fontId="3" fillId="3" borderId="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="4" fillId="6" borderId="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="5" fillId="2" borderId="1" applyFill="1" applyBorder="1"><alignment horizontal="left" vertical="center"/></xf>
    <xf numFmtId="0" fontId="5" fillId="4" borderId="1" applyFill="1" applyBorder="1"><alignment horizontal="left" vertical="center"/></xf>
    <xf numFmtId="0" fontId="5" fillId="5" borderId="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="2" fillId="6" borderId="1" applyFill="1" applyBorder="1"><alignment horizontal="left" vertical="center"/></xf>
    <xf numFmtId="0" fontId="3" fillId="6" borderId="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="3" fillId="6" borderId="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
    <xf numFmtId="0" fontId="0" fillId="6" borderId="1" applyFill="1" applyBorder="1"/>
    <xf numFmtId="0" fontId="0" fillId="7" borderId="1" applyFill="1" applyBorder="1"/>
    <xf numFmtId="0" fontId="0" fillId="8" borderId="1" applyFill="1" applyBorder="1"/>
    <xf numFmtId="0" fontId="0" fillId="9" borderId="1" applyFill="1" applyBorder="1"/>
    <xf numFmtId="0" fontId="0" fillId="10" borderId="1" applyFill="1" applyBorder="1"/>
    <xf numFmtId="0" fontId="3" fillId="0" borderId="2" applyFont="1"><alignment vertical="center"/></xf>
    <xf numFmtId="0" fontId="6" fillId="0" borderId="2" applyFont="1"><alignment vertical="center"/></xf>
    <xf numFmtId="0" fontId="7" fillId="11" borderId="1" applyFill="1" applyBorder="1"><alignment horizontal="center" vertical="center"/></xf>
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`;
  }

  function importCsv(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const tasks = parseCsv(String(reader.result || ""));
      if (!tasks.length) {
        showToast(t("emptyImport"));
        return;
      }
      state.tasks = tasks.map((task, index) => sanitizeTask({ ...task, order: index }, index));
      saveState(true);
      render();
      showToast(t("imported"));
    };
    reader.readAsText(file, "utf-8");
    event.target.value = "";
  }

  function importPngRestore(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const payload = readPngRecoveryPayload(new Uint8Array(reader.result));
        if (!payload || payload.app !== "equipment-gantt" || !payload.state) {
          showToast(t("invalidPng"));
          return;
        }
        if (payload.checksum && payload.checksum !== checksumRecoveryState(payload.state)) {
          showToast(t("checksumMismatch"));
          return;
        }
        state = sanitizeState(payload.state);
        saveState(true);
        render();
        showToast(t("restoredPng"));
      } catch (error) {
        console.warn("Cannot restore PNG", error);
        showToast(t("invalidPng"));
      }
    };
    reader.readAsArrayBuffer(file);
    event.target.value = "";
  }

  function importLogoFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      state.project.logoDataUrl = String(reader.result || "");
      state.project.logoName = file.name;
      saveState(true);
      render();
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  }

  function clearLogo() {
    state.project.logoDataUrl = "";
    state.project.logoName = "";
    saveState(true);
    render();
  }

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let value = "";
    let quoted = false;
    const clean = text.replace(/^\ufeff/, "");
    for (let i = 0; i < clean.length; i += 1) {
      const char = clean[i];
      const next = clean[i + 1];
      if (quoted) {
        if (char === '"' && next === '"') {
          value += '"';
          i += 1;
        } else if (char === '"') {
          quoted = false;
        } else {
          value += char;
        }
      } else if (char === '"') {
        quoted = true;
      } else if (char === ",") {
        row.push(value);
        value = "";
      } else if (char === "\n") {
        row.push(value);
        rows.push(row);
        row = [];
        value = "";
      } else if (char !== "\r") {
        value += char;
      }
    }
    row.push(value);
    rows.push(row);

    const [headerRow, ...dataRows] = rows.filter((items) => items.some((item) => item.trim()));
    if (!headerRow) return [];
    const header = headerRow.map((item) => item.trim());
    return dataRows.map((items) => {
      const task = {};
      header.forEach((name, index) => {
        task[name] = items[index] || "";
      });
      return task;
    });
  }

  function exportPng() {
    createReportPngBlob({ recoverable: true })
      .then((blob) => {
        downloadBlob(blob, buildExportFilename("png"), "image/png");
        showToast(t("exported"));
      })
      .catch((error) => {
        console.warn("Cannot export PNG", error);
        showToast(t("invalidPng"));
      });
  }

  async function showReportPreview() {
    try {
      const blob = await createReportPngBlob({ recoverable: false });
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      previewUrl = URL.createObjectURL(blob);
      els.previewImage.src = previewUrl;
      els.previewModal.hidden = false;
    } catch (error) {
      console.warn("Cannot build report preview", error);
      showToast(t("invalidPng"));
    }
  }

  function hideReportPreview() {
    els.previewModal.hidden = true;
  }

  async function createReportPngBlob(options = {}) {
    const baseBlob = await createReportCanvasBlob();
    if (!options.recoverable) return baseBlob;
    try {
      return await embedPngRecoveryPayload(baseBlob, buildRecoveryPayload());
    } catch (error) {
      console.warn("Cannot embed PNG recovery data", error);
      return baseBlob;
    }
  }

  async function createReportCanvasBlob() {
    const range = getRange();
    const tasks = sortedTasks();
    const days = daysBetween(range.start, range.end) + 1;
    const chartWidth = Math.max(days * 13, 760);
    const leftWidth = 340;
    const rowHeight = 38;
    const headerHeight = 154;
    const width = leftWidth + chartWidth + 56;
    const height = headerHeight + tasks.length * rowHeight + 84;
    const canvas = document.createElement("canvas");
    const scale = window.devicePixelRatio || 1;
    canvas.width = width * scale;
    canvas.height = height * scale;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);
    const logoImage = await loadLogoImage(state.project.logoDataUrl);
    drawPng(ctx, { width, height, leftWidth, rowHeight, headerHeight, chartWidth, range, days, tasks, logoImage });
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas PNG creation failed"));
      }, "image/png");
    });
  }

  function loadLogoImage(source) {
    if (!source) return Promise.resolve(null);
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => resolve(null);
      image.src = source;
    });
  }

  function buildRecoveryPayload() {
    const recoveryState = {
      lang: state.lang,
      project: { ...state.project },
      tasks: state.tasks.map((task) => ({ ...task })),
    };
    return {
      app: "equipment-gantt",
      version: 2,
      createdAt: new Date().toISOString(),
      checksum: checksumRecoveryState(recoveryState),
      state: recoveryState,
    };
  }

  function checksumRecoveryState(recoveryState) {
    const bytes = new TextEncoder().encode(JSON.stringify(recoveryState));
    return crc32(bytes).toString(16).padStart(8, "0");
  }

  async function embedPngRecoveryPayload(blob, payload) {
    const png = new Uint8Array(await blob.arrayBuffer());
    const json = JSON.stringify(payload);
    const chunk = makePngItextChunk("EquipmentGanttData", json);
    return new Blob([insertPngChunkBeforeIend(png, chunk)], { type: "image/png" });
  }

  function readPngRecoveryPayload(png) {
    const signature = [137, 80, 78, 71, 13, 10, 26, 10];
    if (png.length < 12 || !signature.every((byte, index) => png[index] === byte)) {
      return null;
    }
    const decoder = new TextDecoder();
    let offset = 8;
    while (offset + 12 <= png.length) {
      const length = readUint32BE(png, offset);
      const type = decoder.decode(png.slice(offset + 4, offset + 8));
      const dataStart = offset + 8;
      const dataEnd = dataStart + length;
      if (dataEnd + 4 > png.length) return null;
      if (type === "iTXt") {
        const payload = readPngItextData(png.slice(dataStart, dataEnd));
        if (payload?.keyword === "EquipmentGanttData") {
          return JSON.parse(payload.text);
        }
      }
      offset = dataEnd + 4;
    }
    return null;
  }

  function makePngItextChunk(keyword, text) {
    const encoder = new TextEncoder();
    const keywordBytes = encoder.encode(keyword);
    const textBytes = encoder.encode(text);
    const data = new Uint8Array(keywordBytes.length + 5 + textBytes.length);
    let offset = 0;
    data.set(keywordBytes, offset);
    offset += keywordBytes.length;
    data[offset++] = 0;
    data[offset++] = 0;
    data[offset++] = 0;
    data[offset++] = 0;
    data[offset++] = 0;
    data.set(textBytes, offset);
    return makePngChunk("iTXt", data);
  }

  function readPngItextData(data) {
    const decoder = new TextDecoder();
    const keywordEnd = data.indexOf(0);
    if (keywordEnd < 0 || keywordEnd + 5 > data.length) return null;
    const keyword = decoder.decode(data.slice(0, keywordEnd));
    const compressionFlag = data[keywordEnd + 1];
    if (compressionFlag !== 0) return null;
    let offset = keywordEnd + 3;
    const languageEnd = data.indexOf(0, offset);
    if (languageEnd < 0) return null;
    offset = languageEnd + 1;
    const translatedEnd = data.indexOf(0, offset);
    if (translatedEnd < 0) return null;
    offset = translatedEnd + 1;
    return {
      keyword,
      text: decoder.decode(data.slice(offset)),
    };
  }

  function makePngChunk(type, data) {
    const encoder = new TextEncoder();
    const typeBytes = encoder.encode(type);
    const chunk = new Uint8Array(12 + data.length);
    writeUint32BE(chunk, 0, data.length);
    chunk.set(typeBytes, 4);
    chunk.set(data, 8);
    const crcInput = new Uint8Array(typeBytes.length + data.length);
    crcInput.set(typeBytes, 0);
    crcInput.set(data, typeBytes.length);
    writeUint32BE(chunk, 8 + data.length, crc32(crcInput));
    return chunk;
  }

  function insertPngChunkBeforeIend(png, chunk) {
    const decoder = new TextDecoder();
    let offset = 8;
    while (offset + 12 <= png.length) {
      const length = readUint32BE(png, offset);
      const type = decoder.decode(png.slice(offset + 4, offset + 8));
      const next = offset + 12 + length;
      if (next > png.length) throw new Error("Invalid PNG chunk length");
      if (type === "IEND") {
        const output = new Uint8Array(png.length + chunk.length);
        output.set(png.slice(0, offset), 0);
        output.set(chunk, offset);
        output.set(png.slice(offset), offset + chunk.length);
        return output;
      }
      offset = next;
    }
    throw new Error("PNG IEND chunk not found");
  }

  function readUint32BE(bytes, offset) {
    return ((bytes[offset] << 24) | (bytes[offset + 1] << 16) | (bytes[offset + 2] << 8) | bytes[offset + 3]) >>> 0;
  }

  function writeUint32BE(bytes, offset, value) {
    bytes[offset] = (value >>> 24) & 0xff;
    bytes[offset + 1] = (value >>> 16) & 0xff;
    bytes[offset + 2] = (value >>> 8) & 0xff;
    bytes[offset + 3] = value & 0xff;
  }

  function drawPng(ctx, spec) {
    const locale = state.lang === "zh" ? "zh-CN" : "en-US";
    const reportTitle = state.lang === "zh" ? "客户项目进度汇报" : "Customer Schedule Report";
    const periodText = getSchedulePeriod(spec.tasks);
    const delivery = parseDate(state.project.deliveryDate);
    const latestEnd = spec.tasks.reduce((latest, task) => {
      const end = parseDate(task.end);
      return !latest || end > latest ? end : latest;
    }, null);
    const onSchedule = !delivery || !latestEnd || latestEnd <= delivery;
    const statusText = state.lang === "zh"
      ? (onSchedule ? "按计划推进" : "交期需关注")
      : (onSchedule ? "On schedule" : "Delivery attention");
    const overall = calculateOverallProgress(spec.tasks);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, spec.width, spec.height);

    ctx.fillStyle = "#f6f8fb";
    ctx.fillRect(0, 0, spec.width, 118);
    ctx.strokeStyle = "#dbe3ee";
    ctx.beginPath();
    ctx.moveTo(0, 118);
    ctx.lineTo(spec.width, 118);
    ctx.stroke();

    const titleX = spec.logoImage ? 96 : 24;
    const titleMaxWidth = spec.logoImage ? 380 : 430;
    if (spec.logoImage) {
      ctx.fillStyle = "#ffffff";
      roundRect(ctx, 24, 20, 56, 56, 8);
      ctx.fill();
      ctx.strokeStyle = "#dbe3ee";
      ctx.stroke();
      drawContainedImage(ctx, spec.logoImage, 30, 26, 44, 44);
    }

    ctx.fillStyle = "#172033";
    ctx.font = "700 26px Segoe UI, Arial";
    ctx.fillText(reportTitle, titleX, 36);
    ctx.font = "700 15px Segoe UI, Arial";
    fitText(ctx, reportProjectTitle(), titleX, 64, titleMaxWidth);
    ctx.fillStyle = "#667085";
    ctx.font = "12px Segoe UI, Arial";
    fitText(ctx, reportMetaText(), titleX, 88, titleMaxWidth);

    const cards = [
      [t("delivery"), state.project.deliveryDate || "-"],
      [state.lang === "zh" ? "总体进度" : "Overall Progress", `${overall}%`],
      [state.lang === "zh" ? "项目周期" : "Schedule Period", periodText],
      [state.lang === "zh" ? "计划状态" : "Schedule Status", statusText],
    ];
    cards.forEach((card, index) => {
      const x = 500 + index * 170;
      ctx.fillStyle = "#ffffff";
      roundRect(ctx, x, 22, 150, 70, 8);
      ctx.fill();
      ctx.strokeStyle = "#dbe3ee";
      ctx.stroke();
      ctx.fillStyle = "#667085";
      ctx.font = "11px Segoe UI, Arial";
      fitText(ctx, card[0], x + 12, 45, 126);
      ctx.fillStyle = index === 3 && !onSchedule ? "#d88916" : "#172033";
      ctx.font = "700 14px Segoe UI, Arial";
      fitText(ctx, card[1], x + 12, 70, 126);
    });

    const x0 = 24;
    const y0 = spec.headerHeight;
    const timelineX = x0 + spec.leftWidth;
    const dayW = spec.chartWidth / spec.days;

    ctx.fillStyle = "#f2f6fb";
    ctx.fillRect(x0, y0 - 54, spec.leftWidth + spec.chartWidth, 54);
    ctx.strokeStyle = "#dbe3ee";
    ctx.strokeRect(x0, y0 - 54, spec.leftWidth + spec.chartWidth, 54);
    ctx.beginPath();
    ctx.moveTo(timelineX, y0 - 27);
    ctx.lineTo(x0 + spec.leftWidth + spec.chartWidth, y0 - 27);
    ctx.stroke();
    ctx.fillStyle = "#526078";
    ctx.font = "700 12px Segoe UI, Arial";
    ctx.fillText(t("phase"), x0 + 10, y0 - 21);
    ctx.fillText(state.lang === "zh" ? "计划日期" : "Schedule", x0 + 164, y0 - 21);
    ctx.fillText(t("progress"), x0 + 276, y0 - 21);
    let lastDateLabelX = -Infinity;
    let lastWeekLabelX = -Infinity;
    for (let i = 0; i < spec.days; i += 1) {
      const date = addDays(spec.range.start, i);
      const x = timelineX + i * dayW;
      if (date.getDate() === 1 && x - lastDateLabelX > 58) {
        ctx.fillStyle = "#526078";
        ctx.font = "700 12px Segoe UI, Arial";
        ctx.fillText(date.toLocaleDateString(locale, { month: "short", day: "numeric" }), x + 4, y0 - 34);
        lastDateLabelX = x;
      }
      if (date.getDay() === 1 || i === 0) {
        if (x - lastWeekLabelX > 46) {
          const weekIndex = Math.floor(daysBetween(startOfIsoWeek(spec.range.start), startOfIsoWeek(date)) / 7);
          ctx.fillStyle = "#526078";
          ctx.font = "700 11px Segoe UI, Arial";
          ctx.fillText(getWeekDisplayLabel(date, weekIndex, spec.range.start), x + 4, y0 - 9);
          lastWeekLabelX = x;
        }
      }
      ctx.strokeStyle = date.getDay() === 1 ? "#d6e0ec" : (isWeekend(date) ? "#e6edf6" : "#edf1f7");
      ctx.beginPath();
      ctx.moveTo(x, y0 - 54);
      ctx.lineTo(x, y0 + spec.tasks.length * spec.rowHeight);
      ctx.stroke();
    }

    if (delivery && delivery >= spec.range.start && delivery <= spec.range.end) {
      const x = timelineX + daysBetween(spec.range.start, delivery) * dayW;
      ctx.strokeStyle = "#111827";
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.moveTo(x, y0 - 54);
      ctx.lineTo(x, y0 + spec.tasks.length * spec.rowHeight);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    spec.tasks.forEach((task, index) => {
      const y = y0 + index * spec.rowHeight;
      ctx.fillStyle = index % 2 ? "#fbfdff" : "#ffffff";
      ctx.fillRect(x0, y, spec.leftWidth + spec.chartWidth, spec.rowHeight);
      ctx.strokeStyle = "#edf1f7";
      ctx.beginPath();
      ctx.moveTo(x0, y + spec.rowHeight);
      ctx.lineTo(x0 + spec.leftWidth + spec.chartWidth, y + spec.rowHeight);
      ctx.stroke();
      ctx.fillStyle = "#172033";
      ctx.font = "700 12px Segoe UI, Arial";
      fitText(ctx, taskPhase(task), x0 + 10, y + 24, 140);
      ctx.fillStyle = "#667085";
      ctx.font = "12px Segoe UI, Arial";
      ctx.fillText(`${task.start.slice(5)} ~ ${task.end.slice(5)}`, x0 + 164, y + 24);
      ctx.fillText(`${clamp(task.progress, 0, 100)}%`, x0 + 276, y + 24);

      const left = timelineX + daysBetween(spec.range.start, parseDate(task.start)) * dayW;
      const barW = (daysBetween(parseDate(task.start), parseDate(task.end)) + 1) * dayW;
      ctx.fillStyle = getCanvasColor(taskType(task));
      roundRect(ctx, left, y + 7, Math.max(barW, 8), 20, 5);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,.26)";
      roundRect(ctx, left, y + 7, Math.max(barW, 8) * clamp(task.progress, 0, 100) / 100, 20, 5);
      ctx.fill();
      const label = taskBarLabel(task);
      if (label && Math.max(barW, 8) > 52) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "700 11px Segoe UI, Arial";
        fitText(ctx, label, left + 7, y + 21, Math.max(barW, 8) - 14);
      }
    });

    const legendY = spec.height - 46;
    drawLegendItem(ctx, 24, legendY, "#2f6fed", state.lang === "zh" ? "设计阶段" : "Design");
    drawLegendItem(ctx, 124, legendY, "#d88916", state.lang === "zh" ? "采购/加工" : "Procurement/Machining");
    drawLegendItem(ctx, 270, legendY, "#1f9d64", state.lang === "zh" ? "装配/验收/发货" : "Assembly/Acceptance/Shipment");
    ctx.fillStyle = "#667085";
    ctx.font = "12px Segoe UI, Arial";
    ctx.fillText(`${t("delivery")}: ${state.project.deliveryDate}`, spec.width - 300, legendY + 9);

    ctx.fillStyle = "#667085";
    ctx.font = "12px Segoe UI, Arial";
    ctx.fillText(`${t("taskCount").replace("{count}", spec.tasks.length)} · ${state.lang === "zh" ? "生成时间" : "Generated"} ${new Date().toLocaleString()}`, 24, spec.height - 18);
  }

  function calculateOverallProgress(tasks) {
    const totalDays = tasks.reduce((sum, task) => sum + daysBetween(parseDate(task.start), parseDate(task.end)) + 1, 0);
    if (!totalDays) return 0;
    const weighted = tasks.reduce((sum, task) => {
      const duration = daysBetween(parseDate(task.start), parseDate(task.end)) + 1;
      return sum + duration * clamp(task.progress, 0, 100);
    }, 0);
    return Math.round(weighted / totalDays);
  }

  function getSchedulePeriod(tasks) {
    if (!tasks.length) return "-";
    const start = tasks.reduce((min, task) => {
      const date = parseDate(task.start);
      return !min || date < min ? date : min;
    }, null);
    const end = tasks.reduce((max, task) => {
      const date = parseDate(task.end);
      return !max || date > max ? date : max;
    }, null);
    return `${toIso(start).slice(5)} ~ ${toIso(end).slice(5)}`;
  }

  function fitText(ctx, text, x, y, maxWidth) {
    const value = String(text || "");
    if (ctx.measureText(value).width <= maxWidth) {
      ctx.fillText(value, x, y);
      return;
    }
    let output = value;
    while (output.length > 1 && ctx.measureText(`${output}...`).width > maxWidth) {
      output = output.slice(0, -1);
    }
    ctx.fillText(`${output}...`, x, y);
  }

  function drawContainedImage(ctx, image, x, y, width, height) {
    const imageWidth = image.naturalWidth || image.width;
    const imageHeight = image.naturalHeight || image.height;
    if (!imageWidth || !imageHeight) return;
    const scale = Math.min(width / imageWidth, height / imageHeight);
    const drawWidth = imageWidth * scale;
    const drawHeight = imageHeight * scale;
    ctx.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
  }

  function drawLegendItem(ctx, x, y, color, label) {
    ctx.fillStyle = color;
    roundRect(ctx, x, y, 12, 12, 3);
    ctx.fill();
    ctx.fillStyle = "#526078";
    ctx.font = "12px Segoe UI, Arial";
    ctx.fillText(label, x + 18, y + 10);
  }

  function getIsoWeek(date) {
    const target = stripTime(date);
    target.setDate(target.getDate() + 3 - ((target.getDay() + 6) % 7));
    const week1 = new Date(target.getFullYear(), 0, 4);
    return 1 + Math.round(((target - week1) / DAY_MS - 3 + ((week1.getDay() + 6) % 7)) / 7);
  }

  function excelEscape(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[char]);
  }

  function xmlEscape(value) {
    return excelEscape(value);
  }

  function columnName(index) {
    let name = "";
    let n = index;
    while (n > 0) {
      const remainder = (n - 1) % 26;
      name = String.fromCharCode(65 + remainder) + name;
      n = Math.floor((n - 1) / 26);
    }
    return name;
  }

  function makeZipBlob(files, type) {
    const encoder = new TextEncoder();
    const now = new Date();
    const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | Math.floor(now.getSeconds() / 2);
    const dosDate = ((Math.max(now.getFullYear(), 1980) - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
    const localParts = [];
    const centralParts = [];
    let offset = 0;

    files.forEach((file) => {
      const nameBytes = encoder.encode(file.name);
      const data = encoder.encode(file.content);
      const crc = crc32(data);
      const local = new Uint8Array(30 + nameBytes.length + data.length);
      const localView = new DataView(local.buffer);
      writeZipHeader(localView, {
        signature: 0x04034b50,
        versionNeeded: 20,
        flags: 0x0800,
        method: 0,
        time: dosTime,
        date: dosDate,
        crc,
        compressedSize: data.length,
        uncompressedSize: data.length,
        nameLength: nameBytes.length,
      });
      local.set(nameBytes, 30);
      local.set(data, 30 + nameBytes.length);
      localParts.push(local);

      const central = new Uint8Array(46 + nameBytes.length);
      const centralView = new DataView(central.buffer);
      centralView.setUint32(0, 0x02014b50, true);
      centralView.setUint16(4, 20, true);
      centralView.setUint16(6, 20, true);
      centralView.setUint16(8, 0x0800, true);
      centralView.setUint16(10, 0, true);
      centralView.setUint16(12, dosTime, true);
      centralView.setUint16(14, dosDate, true);
      centralView.setUint32(16, crc, true);
      centralView.setUint32(20, data.length, true);
      centralView.setUint32(24, data.length, true);
      centralView.setUint16(28, nameBytes.length, true);
      centralView.setUint16(30, 0, true);
      centralView.setUint16(32, 0, true);
      centralView.setUint16(34, 0, true);
      centralView.setUint16(36, 0, true);
      centralView.setUint32(38, 0, true);
      centralView.setUint32(42, offset, true);
      central.set(nameBytes, 46);
      centralParts.push(central);
      offset += local.length;
    });

    const centralOffset = offset;
    const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
    const end = new Uint8Array(22);
    const endView = new DataView(end.buffer);
    endView.setUint32(0, 0x06054b50, true);
    endView.setUint16(4, 0, true);
    endView.setUint16(6, 0, true);
    endView.setUint16(8, files.length, true);
    endView.setUint16(10, files.length, true);
    endView.setUint32(12, centralSize, true);
    endView.setUint32(16, centralOffset, true);
    endView.setUint16(20, 0, true);
    return new Blob([...localParts, ...centralParts, end], { type });
  }

  function writeZipHeader(view, header) {
    view.setUint32(0, header.signature, true);
    view.setUint16(4, header.versionNeeded, true);
    view.setUint16(6, header.flags, true);
    view.setUint16(8, header.method, true);
    view.setUint16(10, header.time, true);
    view.setUint16(12, header.date, true);
    view.setUint32(14, header.crc, true);
    view.setUint32(18, header.compressedSize, true);
    view.setUint32(22, header.uncompressedSize, true);
    view.setUint16(26, header.nameLength, true);
    view.setUint16(28, 0, true);
  }

  function crc32(bytes) {
    const table = crc32.table || (crc32.table = makeCrc32Table());
    let crc = 0xffffffff;
    for (let i = 0; i < bytes.length; i += 1) {
      crc = (crc >>> 8) ^ table[(crc ^ bytes[i]) & 0xff];
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  function makeCrc32Table() {
    const table = new Uint32Array(256);
    for (let i = 0; i < 256; i += 1) {
      let c = i;
      for (let k = 0; k < 8; k += 1) {
        c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      }
      table[i] = c >>> 0;
    }
    return table;
  }

  function roundRect(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  function getCanvasColor(type) {
    return { design: "#2f6fed", supply: "#d88916", build: "#1f9d64", risk: "#d14343" }[type] || "#2f6fed";
  }

  function saveState(show) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (show) showToast(t("saved"));
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    els.toast.textContent = message;
    els.toast.classList.add("visible");
    toastTimer = setTimeout(() => els.toast.classList.remove("visible"), 1600);
  }

  function downloadBlob(content, filename, type) {
    const blob = content instanceof Blob ? content : new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function buildExportFilename(extension) {
    const project = sanitizeFilenamePart(state.project.projectName || "Project");
    const customer = sanitizeFilenamePart(state.project.customerName || "Customer");
    const date = toIso(new Date());
    return `${project}_${customer}_Gantt_${date}.${extension}`;
  }

  function sanitizeFilenamePart(value) {
    const cleaned = String(value)
      .trim()
      .replace(/[\\/:*?"<>|]+/g, "_")
      .replace(/\s+/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_+|_+$/g, "");
    return (cleaned || "NA").slice(0, 48);
  }

  function csvEscape(value) {
    const text = String(value ?? "");
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }

  function t(key) {
    return messages[state.lang][key] || messages.zh[key] || key;
  }

  function parseDate(value) {
    if (!isDate(value)) return null;
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function isDate(value) {
    return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(`${value}T00:00:00`).getTime());
  }

  function toIso(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function addDays(date, days) {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
  }

  function daysBetween(start, end) {
    return Math.round((stripTime(end) - stripTime(start)) / DAY_MS);
  }

  function stripTime(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function compareDate(a, b) {
    return parseDate(a) - parseDate(b);
  }

  function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
  }

  function createId() {
    return `task-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[char]);
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, "&#96;");
  }

  function plusIcon() {
    return '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>';
  }

  function copyIcon() {
    return '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 8h11v11H8z"/><path d="M5 16H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v1"/></svg>';
  }

  function trashIcon() {
    return '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v5M14 11v5"/></svg>';
  }
})();
