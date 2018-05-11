


// const log = ({getState, dispatch}) => {
//     return (next) => {
//         return (action) => {

//         }
//     }
// }

const log = ({getState, dispatch}) => next => action => {
    console.log("ACTION : " + action.type, action);
    next(action);
};

export default log;