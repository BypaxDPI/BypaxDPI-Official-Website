import React, { useEffect, useMemo, useState } from "react";
import "./WindowsAdminRightsTutorial.css";

// Kusursuz nokta atışı yönlendirme balonu
const GuideTooltip = ({ text, position }) => (
  <div className={`war-guide-tooltip ${position}`}>
    <div className="war-guide-pulse"></div>
    {text}
  </div>
);

const WindowsAdminRightsTutorial = ({ t }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [step, setStep] = useState(0);

  const [clock, setClock] = useState("--:--");
  const [selectedIcon, setSelectedIcon] = useState(false);
  const [showCtx, setShowCtx] = useState(false);
  const [showProps, setShowProps] = useState(false);
  const [showUac, setShowUac] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [tab, setTab] = useState("c");
  const [runAsAdmin, setRunAsAdmin] = useState(false);

  const [hasAdminRights, setHasAdminRights] = useState(false);
  const [appState, setAppState] = useState("closed");

  const isTr =
    t("howpage.adminTabGeneral") === "Genel" ||
    t("howpage.adminTabGeneral")?.includes("Genel");

  const hints = useMemo(
    () => [
      isTr
        ? "Uygulamaya tek tıklayarak açmayı deneyin"
        : "Click the app to try opening it",
      t("howpage.adminHint1"),
      t("howpage.adminHint2"),
      t("howpage.adminHint3"),
      t("howpage.adminHint4"),
      t("howpage.adminHint5"),
    ],
    [t, isTr],
  );

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setClock(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      );
    };
    updateClock();
    const i = setInterval(updateClock, 10000);
    return () => clearInterval(i);
  }, []);

  const startTutorial = () => setHasStarted(true);

  const resetAll = () => {
    setHasStarted(false);
    setStep(0);
    setShowCtx(false);
    setShowProps(false);
    setShowUac(false);
    setShowSuccess(false);
    setTab("c");
    setRunAsAdmin(false);
    setHasAdminRights(false);
    setAppState("closed");
    setSelectedIcon(false);
  };

  const openApp = (e) => {
    if (e) e.stopPropagation();
    setShowCtx(false);
    setSelectedIcon(true);
    if (hasAdminRights) {
      setAppState("ready");
    } else {
      setAppState("error");
    }
  };

  const closeApp = () => {
    setAppState("closed");
    if (step === 0 && !hasAdminRights) setStep(1);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (appState !== "closed") return;
    setSelectedIcon(true);
    setShowCtx(true);
    if (step === 1) setStep(2);
  };

  const openProperties = () => {
    setShowCtx(false);
    setShowProps(true);
    setTab("g");
    if (step === 2) setStep(3);
  };

  const changeTab = (next) => {
    setTab(next);
    if (next === "c" && step === 3) setStep(4);
  };

  const onRunAsAdminChange = (checked) => {
    setRunAsAdmin(checked);
    if (checked && step === 4) setStep(5);
    if (!checked && step === 5) setStep(4);
  };

  const continueWithApply = () => {
    setShowProps(false);
    setShowUac(true);
  };

  const allowUac = () => {
    setShowUac(false);
    setHasAdminRights(true);
    setShowSuccess(true);
    setStep(6);
  };

  const denyUac = () => setShowUac(false);

  return (
    <div className="war-wrap">
      {/* Intro Ekranı */}
      {!hasStarted && (
        <div className="war-intro-overlay">
          <div className="war-intro-card">
            <img src="/favicon.png" className="war-intro-icon" alt="BypaxDPI" />
            <div className="war-intro-title">
              {isTr
                ? "İnteraktif Yönetici İzni Rehberi"
                : "Interactive Admin Rights Tutorial"}
            </div>
            <div className="war-intro-desc">
              {isTr
                ? "Bu simülasyonda BypaxDPI uygulamasını yönetici olarak çalıştırmayı uygulamalı olarak, adım adım deneyimleyeceksiniz."
                : "In this simulation, you will learn step-by-step how to grant administrator privileges to BypaxDPI practically."}
            </div>
            <button className="war-intro-btn" onClick={startTutorial}>
              {isTr ? "Simülasyona Başla" : "Start Simulation"}
            </button>
          </div>
        </div>
      )}

      {/* İlerleme Çubuğu */}
      <div className="war-steps-bar">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <React.Fragment key={`s-${i}`}>
            <div
              className={`war-sdot ${i < step ? "done" : i === step ? "active" : ""}`}
            >
              {i < step ? "✓" : i + 1}
            </div>
            {i < 5 && (
              <div className={`war-sline ${i < step ? "done" : ""}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="war-hint-bar">
        <span className="war-hint-arrow">▶</span>
        <span>{hints[Math.min(step, 5)]}</span>
      </div>

  

      {/* İnteraktif Masaüstü */}
      <div
        className="war-desktop"
        onClick={(e) => {
          if (
            !e.target.closest(".war-ctx") &&
            !e.target.closest(".war-dicon") &&
            !e.target.closest(".war-app-window") &&
            !e.target.closest(".war-wdlg") &&
            !e.target.closest(".war-uac")
          ) {
            setShowCtx(false);
            setSelectedIcon(false);
          }
        }}
      >
        <div className="war-wallpaper"></div>

        {/* Masaüstü İkonu */}
        <div
          className={`war-dicon ${selectedIcon ? "sel" : ""}`}
          onClick={openApp}
          onContextMenu={handleContextMenu}
        >
          <div className="war-dicon-img">
            <img src="/favicon.png" alt="BypaxDPI" />
          </div>
          <div className="war-dicon-label">bypaxDPI.exe</div>

          {hasStarted && step === 0 && appState === "closed" && !showCtx && (
            <GuideTooltip
              text={isTr ? "Açmak için tıklayın" : "Click to open"}
              position="pos-top"
            />
          )}

          {hasStarted && step === 1 && appState === "closed" && !showCtx && (
            <GuideTooltip
              text={isTr ? "Şimdi sağ tıklayın" : "Now right-click"}
              position="pos-top"
            />
          )}
        </div>

        {/* Sağ Tık Menüsü */}
        {showCtx && (
          <div className="war-ctx">
            <div
              className="war-citem"
              onClick={openApp}
              style={{ cursor: "pointer", fontWeight: 600 }}
            >
              {isTr ? "Aç" : "Open"}
            </div>
            <div className="war-citem">{t("howpage.adminMenuRunAsAdmin")}</div>
            <div className="war-citem">{t("howpage.adminMenuPin")}</div>
            <div className="war-csep"></div>
            <div className="war-citem">{t("howpage.adminMenuCut")}</div>
            <div className="war-citem">{t("howpage.adminMenuCopy")}</div>
            <div className="war-csep"></div>

            <div
              className="war-citem hot"
              onClick={openProperties}
              style={{ position: "relative" }}
            >
              {t("howpage.adminDemoProperties")}
              {step === 2 && (
                <GuideTooltip
                  text={isTr ? "Özellikler'i seçin" : "Click Properties"}
                  position="pos-right"
                />
              )}
            </div>
          </div>
        )}

        {/* Uygulama Ekranı */}
        {appState !== "closed" && (
          <div className="war-app-window">
            <div className="war-app-titlebar">
              <div className="war-app-tb-left">
                <img src="/favicon.png" alt="icon" /> BypaxDPI
              </div>
              <div className="war-app-tb-right">
                <div className="war-app-tb-btn">─</div>
                <div className="war-app-tb-btn">□</div>
                <div className="war-app-tb-btn close" onClick={closeApp}>
                  ✕
                </div>
              </div>
            </div>

            {/* Hata Görünümü */}
            {appState === "error" && (
              <div className="war-app-error">
                <img
                  src="/favicon.png"
                  className="war-app-logo-large"
                  alt="BypaxDPI Logo"
                />
                <div className="war-app-err-title">
                  {isTr ? "Yönetici İzni Gerekli" : "Admin Rights Required"}
                </div>
                <div className="war-app-err-desc">
                  {isTr
                    ? "BypaxDPI'ın düzgün çalışması için yönetici olarak çalıştırılması gereklidir."
                    : "BypaxDPI must be run as administrator to function properly."}
                </div>

                <div className="war-app-err-box">
                  <div className="war-app-err-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: "18px", height: "18px" }}
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div className="war-app-err-text">
                    {isTr ? (
                      <>
                        Uygulamaya sağ tıklayın →<br />
                        <b>"Yönetici olarak çalıştır"</b> seçin
                      </>
                    ) : (
                      <>
                        Right click the app →<br />
                        Select <b>"Run as administrator"</b>
                      </>
                    )}
                  </div>
                </div>

                <button className="war-app-btn-blue">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: "18px", height: "18px" }}
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  {isTr ? "Nasıl Çalışır?" : "How it Works?"}
                </button>

                <div style={{ position: "relative", width: "100%" }}>
                  <button className="war-app-btn-red" onClick={closeApp}>
                    {isTr ? "KAPAT" : "CLOSE"}
                  </button>
                  <GuideTooltip
                    text={isTr ? "Uygulamayı kapatın" : "Close the app"}
                    position="pos-top"
                  />
                </div>
              </div>
            )}

            {/* Başarılı Hazır Görünüm */}
            {appState === "ready" && (
              <div className="war-app-ready">
                <div className="war-ready-top">
                  <div className="war-ready-brand">
                    <img src="/favicon.png" alt="Logo" /> BYPAXDPI
                  </div>
                  <div className="war-ready-badge">
                    <div className="dot"></div> {isTr ? "HAZIR" : "READY"}
                  </div>
                </div>

                <div className="war-ready-center">
                  <div className="war-ready-circle">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div className="war-ready-title">
                    {isTr ? "HAZIR" : "READY"}
                  </div>
                  <div className="war-ready-desc">
                    {isTr
                      ? "DPI Bypass için bağlanın."
                      : "Connect for DPI Bypass."}
                  </div>
                  <button className="war-app-btn-white">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                      <line x1="12" y1="2" x2="12" y2="12"></line>
                    </svg>
                    {isTr ? "BAĞLAN" : "CONNECT"}
                  </button>
                </div>

                <div className="war-ready-bottom">
                  <div className="war-nav-item">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: 20, height: 20, marginBottom: 4 }}
                    >
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                    {isTr ? "AYARLAR" : "SETTINGS"}
                  </div>
                  <div className="war-nav-divider"></div>
                  <div className="war-nav-item">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: 20, height: 20, marginBottom: 4 }}
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    {isTr ? "LOGLAR" : "LOGS"}
                  </div>
                  <div className="war-nav-divider"></div>
                  <div className="war-nav-item" onClick={closeApp}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: 20, height: 20, marginBottom: 4 }}
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    {isTr ? "ÇIKIŞ" : "EXIT"}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Özellikler Penceresi */}
        {showProps && (
          <div className="war-wdlg">
            <div className="war-wtbar">
              <img
                src="/favicon.png"
                alt="Icon"
                style={{ width: 14, height: 14 }}
              />
              <div className="war-wtitle">{t("howpage.adminPropTitle")}</div>
              <div className="war-wclose" onClick={() => setShowProps(false)}>
                ✕
              </div>
            </div>

            <div className="war-wtabs">
              <div
                className={`war-wtab ${tab === "g" ? "active" : ""}`}
                onClick={() => changeTab("g")}
              >
                {t("howpage.adminTabGeneral")}
              </div>

              <div
                className={`war-wtab ${tab === "c" ? "active" : ""}`}
                onClick={() => changeTab("c")}
                style={{ position: "relative" }}
              >
                {t("howpage.adminTabCompatibility")}
                {step === 3 && tab !== "c" && (
                  <GuideTooltip
                    text={isTr ? "Bu sekmeye tıklayın" : "Click this tab"}
                    position="pos-top"
                  />
                )}
              </div>

              <div className={`war-wtab ${tab === "a" ? "active" : ""}`}>
                {t("howpage.adminTabArchive") || "Archive"}
              </div>
              <div className={`war-wtab ${tab === "i" ? "active" : ""}`}>
                {t("howpage.adminTabIcons") || "Icons"}
              </div>
            </div>

            <div className="war-wtabcontent">
              {tab === "g" && (
                <div>
                  <div className="war-g-header">
                    <img src="/favicon.png" className="war-g-icon" alt="App" />
                    <input
                      type="text"
                      className="war-g-input"
                      value="bypaxDPI.exe"
                      readOnly
                    />
                  </div>
                  <hr className="war-hr" />
                  <div className="war-g-grid">
                    <div className="war-g-label">
                      {isTr ? "Dosya türü:" : "File type:"}
                    </div>
                    <div className="war-g-value">
                      {isTr ? "Uygulama (.exe)" : "Application (.exe)"}
                    </div>
                    <div className="war-g-label">
                      {isTr ? "Konum:" : "Location:"}
                    </div>
                    <div className="war-g-value">
                      C:\Users\ConsolAktif\AppData\Local\BypaxDPI
                    </div>
                    <div className="war-g-label">
                      {isTr ? "Boyut:" : "Size:"}
                    </div>
                    <div className="war-g-value">8,64 MB</div>
                  </div>
                </div>
              )}

              {tab === "c" && (
                <div>
                  <div className="war-compat-intro">
                    {t("howpage.adminCompatIntro")}
                  </div>
                  <button className="war-btn">
                    {t("howpage.adminCompatTroubleshooter")}
                  </button>
                  <br />
                  <a
                    href="#help"
                    className="war-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    {t("howpage.adminCompatHelpLink")}
                  </a>

                  <fieldset
                    className="war-fieldset"
                    style={{ marginBottom: 12 }}
                  >
                    <legend className="war-legend">
                      {t("howpage.adminCompatSettingsTitle")}
                    </legend>
                    <label className="war-chkrow">
                      <input type="checkbox" disabled />{" "}
                      <span>{t("howpage.adminCompatOpt1")}</span>
                    </label>
                    <label className="war-chkrow">
                      <input type="checkbox" disabled />{" "}
                      <span>{t("howpage.adminCompatOpt2")}</span>
                    </label>
                    <label className="war-chkrow">
                      <input type="checkbox" disabled />{" "}
                      <span>{t("howpage.adminCompatOpt3")}</span>
                    </label>

                    {/* Kırpılma Sorununu Çözen pos-top */}
                    <div
                      className="war-pulse-border"
                      style={{
                        position: "relative",
                        marginTop: 8,
                        marginBottom: 8,
                      }}
                    >
                      <label className="war-chkrow" style={{ margin: 0 }}>
                        <input
                          type="checkbox"
                          checked={runAsAdmin}
                          onChange={(e) => onRunAsAdminChange(e.target.checked)}
                        />
                        <span style={{ fontWeight: 600, color: "#000" }}>
                          {t("howpage.adminDemoRunAsAdmin")}
                        </span>
                      </label>
                      {step === 4 && (
                        <GuideTooltip
                          text={isTr ? "Kutuyu işaretleyin" : "Check this box"}
                          position="pos-top"
                        />
                      )}
                    </div>

                    <label className="war-chkrow">
                      <input type="checkbox" disabled />{" "}
                      <span>{t("howpage.adminCompatOpt5")}</span>
                    </label>
                    <label className="war-chkrow">
                      <input type="checkbox" disabled />{" "}
                      <span>{t("howpage.adminCompatOpt6")}</span>
                    </label>
                  </fieldset>
                </div>
              )}
            </div>

            <div className="war-wfooter">
              <button
                className="war-btn"
                onClick={() => setShowProps(false)}
                style={{ minWidth: 80 }}
              >
                {t("howpage.adminCancel")}
              </button>

              <div style={{ position: "relative", display: "inline-block" }}>
                <button
                  className="war-btn"
                  disabled={!runAsAdmin}
                  onClick={continueWithApply}
                  style={{ minWidth: 80 }}
                >
                  {isTr ? "Tamam" : "OK"}
                </button>
                {step === 5 && (
                  <GuideTooltip
                    text={isTr ? "Kaydetmek için basın" : "Click to save"}
                    position="pos-top"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* UAC Ekranı ve Dark Overlay */}
        {showUac && (
          <>
            <div className="war-uac-backdrop" />

            <div className="war-uac">
              <div className="war-uac-head">
                <div
                  style={{
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: ".1em",
                    color: "#93c5fd",
                    marginBottom: 6,
                  }}
                >
                  {t("howpage.adminUacTitle")}
                </div>
                <div
                  style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.45 }}
                >
                  {t("howpage.adminUacQuestion")}
                </div>
              </div>
              <div className="war-uac-body">
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    marginBottom: 14,
                    padding: 12,
                    background: "#fff",
                    borderRadius: 6,
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <div style={{ fontSize: 36, lineHeight: 1 }}>🛡️</div>
                  <div>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#1a1a1a",
                      }}
                    >
                      bypaxDPI.exe
                    </div>
                    <div style={{ fontSize: 11, color: "#555", marginTop: 3 }}>
                      {t("howpage.adminUacPublisher")}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    justifyContent: "flex-end",
                  }}
                >
                  <button className="war-btn" onClick={denyUac}>
                    {t("howpage.adminNo")}
                  </button>

                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <button
                      className="war-btn"
                      style={{ borderColor: "#0078d4", background: "#e5f1fb" }}
                      onClick={allowUac}
                    >
                      {t("howpage.adminYes")}
                    </button>
                    <GuideTooltip
                      text={
                        isTr
                          ? "İzin vermek için Evet deyin"
                          : "Click Yes to allow"
                      }
                      position="pos-top"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Görev Çubuğu */}
        <div className="war-taskbar">
          <div className="war-tb-icon">
            <img
              src="/images/win11_start.png"
              alt="Start"
              style={{ width: 22, height: 22, objectFit: "contain" }}
            />
          </div>
          <div className="war-tb-clock">
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>
              {clock}
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>
              25.03.2025
            </div>
          </div>
        </div>

        {/* Başarı Ekranı */}
        {showSuccess && (
          <div className="war-success">
            <div className="war-sicon">✓</div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: "#22c55e",
                marginBottom: 8,
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }}
            >
              {t("howpage.adminDemoDoneTitle")}
            </div>
            <div
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,.8)",
                textAlign: "center",
                maxWidth: 360,
                lineHeight: 1.6,
              }}
            >
              {t("howpage.adminDemoDone")}
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
              <button
                className="war-reset-btn"
                onClick={resetAll}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "#e2e8f0",
                }}
              >
                {t("howpage.adminRestart")}
              </button>

              <div style={{ position: "relative" }}>
                <button
                  className="war-reset-btn"
                  onClick={() => {
                    setShowSuccess(false);
                    openApp();
                  }}
                >
                  {isTr ? "BypaxDPI'ı Aç" : "Open BypaxDPI"}
                </button>
                <GuideTooltip
                  text={isTr ? "Uygulamayı test et" : "Test the app"}
                  position="pos-bottom"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WindowsAdminRightsTutorial;
