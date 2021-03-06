var StcGLEngine = (function (exports) {
  'use strict';

  function defined(value) {
      return value !== undefined && value !== null;
  }

  var DeveloperError = (function () {
      function DeveloperError(message) {
          this.name = "DeveloperError";
          this.message = message;
          var stack;
          try {
              throw new Error();
          }
          catch (e) {
              stack = e.stack;
          }
          this.stack = stack;
      }
      DeveloperError.throwInstantiationError = function () {
          throw new DeveloperError("This function defines an interface and should not be called directly.");
      };
      DeveloperError.prototype.toString = function () {
          var str = this.name + ": " + this.message;
          if (defined(this.stack)) {
              str += "\n" + this.stack.toString();
          }
          return str;
      };
      return DeveloperError;
  }());

  var Check = {};
  Check.typeOf = {};
  function getUndefinedErrorMessage(name) {
      return name + " is required, actual value was undefined";
  }
  function getFailedTypeErrorMessage(actual, expected, name) {
      return ("Expected " +
          name +
          " to be typeof " +
          expected +
          ", actual typeof was " +
          actual);
  }
  Check.defined = function (name, test) {
      if (!defined(test)) {
          throw new DeveloperError(getUndefinedErrorMessage(name));
      }
  };
  Check.typeOf.func = function (name, test) {
      if (typeof test !== "function") {
          throw new DeveloperError(getFailedTypeErrorMessage(typeof test, "function", name));
      }
  };
  Check.typeOf.string = function (name, test) {
      if (typeof test !== "string") {
          throw new DeveloperError(getFailedTypeErrorMessage(typeof test, "string", name));
      }
  };
  Check.typeOf.number = function (name, test) {
      if (typeof test !== "number") {
          throw new DeveloperError(getFailedTypeErrorMessage(typeof test, "number", name));
      }
  };
  Check.typeOf.number.lessThan = function (name, test, limit) {
      Check.typeOf.number(name, test);
      if (test >= limit) {
          throw new DeveloperError("Expected " +
              name +
              " to be less than " +
              limit +
              ", actual value was " +
              test);
      }
  };
  Check.typeOf.number.lessThanOrEquals = function (name, test, limit) {
      Check.typeOf.number(name, test);
      if (test > limit) {
          throw new DeveloperError("Expected " +
              name +
              " to be less than or equal to " +
              limit +
              ", actual value was " +
              test);
      }
  };
  Check.typeOf.number.greaterThan = function (name, test, limit) {
      Check.typeOf.number(name, test);
      if (test <= limit) {
          throw new DeveloperError("Expected " +
              name +
              " to be greater than " +
              limit +
              ", actual value was " +
              test);
      }
  };
  Check.typeOf.number.greaterThanOrEquals = function (name, test, limit) {
      Check.typeOf.number(name, test);
      if (test < limit) {
          throw new DeveloperError("Expected " +
              name +
              " to be greater than or equal to" +
              limit +
              ", actual value was " +
              test);
      }
  };
  Check.typeOf.object = function (name, test) {
      if (typeof test !== "object") {
          throw new DeveloperError(getFailedTypeErrorMessage(typeof test, "object", name));
      }
  };
  Check.typeOf.bool = function (name, test) {
      if (typeof test !== "boolean") {
          throw new DeveloperError(getFailedTypeErrorMessage(typeof test, "boolean", name));
      }
  };
  Check.typeOf.number.equals = function (name1, name2, test1, test2) {
      Check.typeOf.number(name1, test1);
      Check.typeOf.number(name2, test2);
      if (test1 !== test2) {
          throw new DeveloperError(name1 +
              " must be equal to " +
              name2 +
              ", the actual values are " +
              test1 +
              " and " +
              test2);
      }
  };

  var compareNumber = function (a, b) {
      return b - a;
  };
  var Event = (function () {
      function Event() {
          var _this = this;
          this.addEventListener = function (listener, scope) {
              Check.typeOf.func("listener", listener);
              _this._listeners.push(listener);
              _this._scopes.push(scope);
              var event = _this;
              return function () {
                  event.removeEventListener(listener, scope);
              };
          };
          this.removeEventListener = function (listener, scope) {
              Check.typeOf.func("listener", listener);
              var listeners = _this._listeners;
              var scopes = _this._scopes;
              var index = -1;
              for (var i = 0; i < listeners.length; i++) {
                  if (listeners[i] === listener && scopes[i] === scope) {
                      index = i;
                      break;
                  }
              }
              if (index !== -1) {
                  if (_this._insideRaiseEvent) {
                      _this._toRemove.push(index);
                      listeners[index] = undefined;
                      scopes[index] = undefined;
                  }
                  else {
                      listeners.splice(index, 1);
                      scopes.splice(index, 1);
                  }
                  return true;
              }
              return false;
          };
          this.raiseEvent = function (rest) {
              _this._insideRaiseEvent = true;
              var i;
              var listeners = _this._listeners;
              var scopes = _this._scopes;
              var length = listeners.length;
              for (i = 0; i < length; i++) {
                  var listener = listeners[i];
                  if (defined(listener)) {
                      listeners[i].apply(scopes[i], rest);
                  }
              }
              var toRemove = _this._toRemove;
              length = toRemove.length;
              if (length > 0) {
                  toRemove.sort(compareNumber);
                  for (i = 0; i < length; i++) {
                      var index = toRemove[i];
                      listeners.splice(index, 1);
                      scopes.splice(index, 1);
                  }
                  toRemove.length = 0;
              }
              _this._insideRaiseEvent = false;
          };
          this._listeners = [];
          this._scopes = [];
          this._toRemove = [];
          this._insideRaiseEvent = false;
      }
      return Event;
  }());
  Object.defineProperties(Event.prototype, {
      numberOfListeners: {
          get: function () {
              return this._listeners.length - this._toRemove.length;
          }
      }
  });

  var defaultContextAtt = {
      alpha: true,
      antialias: true,
      depth: true,
      failIfMajorPerformanceCaveat: true,
      powerPreference: "default",
      premultipliedAlpha: true,
      preserveDrawingBuffer: true,
      stencil: true
  };
  var create3DContext = function (canvas) {
      var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
      var context = null;
      for (var ii = 0; ii < names.length; ++ii) {
          try {
              context = canvas.getContext(names[ii], defaultContextAtt);
          }
          catch (e) { }
          if (context) {
              break;
          }
      }
      return context;
  };
  var Scene = (function () {
      function Scene(canvas, config) {
          this.beforeRender = new Event();
          this.beforePostPrecess = new Event();
          this.renderError = new Event();
          if (!defined(canvas)) {
              throw new DeveloperError("options and options.canvas are required.");
          }
          this.contextGL = create3DContext(canvas);
          if (!defined(this.contextGL)) {
              throw new DeveloperError("创建canvas上下文失败！");
          }
      }
      return Scene;
  }());

  var GetWindowSize = function () {
      return {
          width: window.innerWidth,
          height: window.innerHeight
      };
  };

  var Viwer = (function () {
      function Viwer(container, option) {
          if (!defined(container)) {
              return;
          }
          if (typeof container === "string") {
              var containerEle = document.getElementById(container);
              if (containerEle) {
                  var innerContainerDiv = document.createElement("div");
                  innerContainerDiv.className = "stc-gl-innerDiv";
                  var sceneCanvas = document.createElement("canvas");
                  var winSize = GetWindowSize();
                  sceneCanvas.width = winSize.width;
                  sceneCanvas.height = winSize.height;
                  innerContainerDiv.appendChild(sceneCanvas);
                  containerEle.appendChild(innerContainerDiv);
                  this.Scene = new Scene(sceneCanvas, {
                      width: winSize.width,
                      height: winSize.height
                  });
              }
          }
      }
      return Viwer;
  }());

  var VERSION = "1.0.0";

  exports.Check = Check;
  exports.VERSION = VERSION;
  exports.Viewer = Viwer;

  return exports;

}({}));
