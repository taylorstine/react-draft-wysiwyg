let callBacks = [];

export default {
  onKeyDown: (event: Object) => {
    callBacks.forEach((callBack) => {
      callBack(event);
    });
  },

  registerCallBack: (callBack) => {
    callBacks.push(callBack);
  },

  deregisterCallBack: (callBack) => {
    callBacks = callBacks.filter(cb => cb !== callBack);
  },
};
