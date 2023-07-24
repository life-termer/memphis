import ie from "../../assets/images/icons/ic-ie.png";
import update from "../../assets/images/icons/ic-update.png";
import documents from "../../assets/images/icons/ic-documents.png";
import help from "../../assets/images/icons/ic-help.png";
import shutdown from "../../assets/images/icons/ic-shutdown.png";
import logOff from "../../assets/images/icons/ic-log-off.png";
import programs from "../../assets/images/icons/ic-programs.png";
import cv from "../../assets/images/icons/ic-file-cv.png";
import padlock from "../../assets/images/icons/ic-file-padlock.png";

const menuItems = [
  {
    id: 1,
    fullName: "Windows Update",
    classes: "update",
    image: update,
    imageAlt: "logo",
    running: "",
    active: "",
    minimized: "",
    desktopShortcut: false,
    startItem: true,
  },
  {
    id: 2,
    fullName: "Programs",
    classes: "programs",
    image: programs,
    imageAlt: "logo",
    desktopShortcut: false,
    startItem: true,
    programList: [
      {
        id: 21,
        group: "programs",
        fullName: "Internet Explorer",
        classes: "ie",
        image: ie,
        imageAlt: "logo",
        running: "",
        active: "",
        minimized: "",
        desktopShortcut: true,
        focused: "",
      },
    ],
  },
  {
    id: 3,
    fullName: "Documents",
    classes: "docs",
    image: documents,
    imageAlt: "logo",
    running: "",
    active: "",
    minimized: "",
    desktopShortcut: true,
    focused: "",
    startItem: true,
  },
  {
    id: 4,
    fullName: "Help",
    classes: "help",
    image: help,
    imageAlt: "logo",
    running: "",
    active: "",
    minimized: "",
    desktopShortcut: false,
    startItem: true,
  },
  {
    id: 5,
    fullName: "Log Off",
    classes: "log-off",
    image: logOff,
    imageAlt: "logo",
    running: "",
    active: "",
    minimized: "",
    desktopShortcut: false,
    startItem: true,
  },
  {
    id: 6,
    fullName: "Shutdown",
    classes: "shutdown",
    image: shutdown,
    imageAlt: "logo",
    running: "",
    active: "",
    minimized: "",
    desktopShortcut: false,
    startItem: true,
  },
  {
    id: 7,
    fullName: "SurchinSV",
    classes: "cv",
    image: cv,
    imageAlt: "logo",
    running: "",
    active: "",
    minimized: "",
    desktopShortcut: false,
    startItem: false,
  },
  {
    id: 8,
    fullName: "passwords",
    classes: "pass",
    image: padlock,
    imageAlt: "logo",
    running: "",
    active: "",
    minimized: "",
    desktopShortcut: false,
    startItem: false,
  },
];

export { menuItems };
