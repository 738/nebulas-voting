// class MainDataController {
//     // EventListener should be added once
//     // isEventListenerAdded;
//     // constructor() {
//     //     this.isEventListenerAdded = false;
//     // }

//     addEventListenerToWindow(listener) {
//         // if (this.isEventListenerAdded === true) return; 
//         // return token (in order to remove this event listener using this token)
//         window.addEventListener('message', e => {
//             if (e.data.data.neb_call) {
//                 var result = e.data.data.neb_call.result;
//                 if (result === 'null') {
//                     console.log('result is null');
//                 } else {
//                     try {
//                         result = JSON.parse(e.data.data.neb_call.result);
//                         var { func } = result;
//                         console.log(result);
//                         listener(func, result);
//                     } catch (err) {
//                         console.log(err);
//                     }
//                 }
//             }
//         });
//         // this.isEventListenerAdded = true;
//     }
// }

// export default new MainDataController();