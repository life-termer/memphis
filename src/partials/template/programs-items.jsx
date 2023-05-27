
import ie from '../../assets/images/icons/ic-ie.png'
import update from '../../assets/images/icons/ic-update.png'
import documents from '../../assets/images/icons/ic-documents.png'
import help from '../../assets/images/icons/ic-help.png'
import shutdown from '../../assets/images/icons/ic-shutdown.png'
import logOff from '../../assets/images/icons/ic-log-off.png'
import programs from '../../assets/images/icons/ic-programs.png'

const menuItems = [{
  id: 1,
  fullName: "Windows Update",
  classes: "line update",
  image: update,
  imageAlt: 'logo',
  running: '',
  active: '',
  minimized: '',
  desktopShortcut: false,
},
{
  id: 2,
  fullName: "Programs",
  classes: "programs",
  image: programs,
  imageAlt: 'logo',
  desktopShortcut: false,
  programList: [{
      id: 21,
      group: 'programs',
      fullName: "Internet Explorer",
      classes: "",
      image: ie,
      imageAlt: 'logo',
      running: '',
      active: '',
      minimized: '',
      desktopShortcut: true,
    },
    {
      id: 22,
      group: 'programs',
      fullName: "Program-02",
      classes: "",
      image: ie,
      imageAlt: 'logo',
      running: '',
      active: '',
      minimized: '',
      desktopShortcut: true,
    }]
},
{
  id: 3,
  fullName: "Documents",
  classes: "docs",
  image: documents,
  imageAlt: 'logo',
  running: '',
  active: '',
  minimized: '',
  desktopShortcut: false,
},
{
  id: 4,
  fullName: "Help",
  classes: "help line",
  image: help,
  imageAlt: 'logo',
  running: '',
  active: '',
  minimized: '',
  desktopShortcut: false,
},
{
  id: 5,
  fullName: "Log Off",
  classes: "log-off",
  image: logOff,
  imageAlt: 'logo',
  running: '',
  active: '',
  minimized: '',
  desktopShortcut: false,
},
{
  id: 6,
  fullName: "Shutdown",
  classes: "shutdown",
  image: shutdown,
  imageAlt: 'logo',
  running: '',
  active: '',
  minimized: '',
  desktopShortcut: false,
}
];


export  {menuItems}



                    
             