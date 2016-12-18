/*
 * jQuery UI 1.8.11
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function (C, A) {
    function B(D) {
        return !C(D).parents().andSelf().filter(function () {
            return C.curCSS(this, "visibility") === "hidden" || C.expr.filters.hidden(this)
        }).length
    }

    C.ui = C.ui || {};
    if (!C.ui.version) {
        C.extend(C.ui, {
            version: "1.8.11",
            keyCode: {
                ALT: 18,
                BACKSPACE: 8,
                CAPS_LOCK: 20,
                COMMA: 188,
                COMMAND: 91,
                COMMAND_LEFT: 91,
                COMMAND_RIGHT: 93,
                CONTROL: 17,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                MENU: 93,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SHIFT: 16,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                WINDOWS: 91
            }
        });
        C.fn.extend({
            _focus: C.fn.focus, focus: function (D, E) {
                return typeof D === "number" ? this.each(function () {
                    var F = this;
                    setTimeout(function () {
                        C(F).focus();
                        E && E.call(F)
                    }, D)
                }) : this._focus.apply(this, arguments)
            }, scrollParent: function () {
                var D;
                D = C.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
                    return /(relative|absolute|fixed)/.test(C.curCSS(this, "position", 1)) && /(auto|scroll)/.test(C.curCSS(this, "overflow", 1) + C.curCSS(this, "overflow-y", 1) + C.curCSS(this, "overflow-x", 1))
                }).eq(0) : this.parents().filter(function () {
                    return /(auto|scroll)/.test(C.curCSS(this, "overflow", 1) + C.curCSS(this, "overflow-y", 1) + C.curCSS(this, "overflow-x", 1))
                }).eq(0);
                return /fixed/.test(this.css("position")) || !D.length ? C(document) : D
            }, zIndex: function (D) {
                if (D !== A) {
                    return this.css("zIndex", D)
                }
                if (this.length) {
                    D = C(this[0]);
                    for (var E; D.length && D[0] !== document;) {
                        E = D.css("position");
                        if (E === "absolute" || E === "relative" || E === "fixed") {
                            E = parseInt(D.css("zIndex"), 10);
                            if (!isNaN(E) && E !== 0) {
                                return E
                            }
                        }
                        D = D.parent()
                    }
                }
                return 0
            }, disableSelection: function () {
                return this.bind((C.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (D) {
                    D.preventDefault()
                })
            }, enableSelection: function () {
                return this.unbind(".ui-disableSelection")
            }
        });
        C.each(["Width", "Height"], function (D, I) {
            function H(M, J, K, L) {
                C.each(G, function () {
                    J -= parseFloat(C.curCSS(M, "padding" + this, true)) || 0;
                    if (K) {
                        J -= parseFloat(C.curCSS(M, "border" + this + "Width", true)) || 0
                    }
                    if (L) {
                        J -= parseFloat(C.curCSS(M, "margin" + this, true)) || 0
                    }
                });
                return J
            }

            var G = I === "Width" ? ["Left", "Right"] : ["Top", "Bottom"], E = I.toLowerCase(), F = {
                innerWidth: C.fn.innerWidth,
                innerHeight: C.fn.innerHeight,
                outerWidth: C.fn.outerWidth,
                outerHeight: C.fn.outerHeight
            };
            C.fn["inner" + I] = function (J) {
                if (J === A) {
                    return F["inner" + I].call(this)
                }
                return this.each(function () {
                    C(this).css(E, H(this, J) + "px")
                })
            };
            C.fn["outer" + I] = function (K, J) {
                if (typeof K !== "number") {
                    return F["outer" + I].call(this, K)
                }
                return this.each(function () {
                    C(this).css(E, H(this, K, true, J) + "px")
                })
            }
        });
        C.extend(C.expr[":"], {
            data: function (D, F, E) {
                return !!C.data(D, E[3])
            }, focusable: function (D) {
                var F = D.nodeName.toLowerCase(), E = C.attr(D, "tabindex");
                if ("area" === F) {
                    F = D.parentNode;
                    E = F.name;
                    if (!D.href || !E || F.nodeName.toLowerCase() !== "map") {
                        return false
                    }
                    D = C("img[usemap=#" + E + "]")[0];
                    return !!D && B(D)
                }
                return (/input|select|textarea|button|object/.test(F) ? !D.disabled : "a" == F ? D.href || !isNaN(E) : !isNaN(E)) && B(D)
            }, tabbable: function (D) {
                var E = C.attr(D, "tabindex");
                return (isNaN(E) || E >= 0) && C(D).is(":focusable")
            }
        });
        C(function () {
            var D = document.body, E = D.appendChild(E = document.createElement("div"));
            C.extend(E.style, {minHeight: "100px", height: "auto", padding: 0, borderWidth: 0});
            C.support.minHeight = E.offsetHeight === 100;
            C.support.selectstart = "onselectstart" in E;
            D.removeChild(E).style.display = "none"
        });
        C.extend(C.ui, {
            plugin: {
                add: function (D, G, F) {
                    D = C.ui[D].prototype;
                    for (var E in F) {
                        D.plugins[E] = D.plugins[E] || [];
                        D.plugins[E].push([G, F[E]])
                    }
                }, call: function (D, G, F) {
                    if ((G = D.plugins[G]) && D.element[0].parentNode) {
                        for (var E = 0; E < G.length; E++) {
                            D.options[G[E][0]] && G[E][1].apply(D.element, F)
                        }
                    }
                }
            }, contains: function (D, E) {
                return document.compareDocumentPosition ? D.compareDocumentPosition(E) & 16 : D !== E && D.contains(E)
            }, hasScroll: function (D, F) {
                if (C(D).css("overflow") === "hidden") {
                    return false
                }
                F = F && F === "left" ? "scrollLeft" : "scrollTop";
                var E = false;
                if (D[F] > 0) {
                    return true
                }
                D[F] = 1;
                E = D[F] > 0;
                D[F] = 0;
                return E
            }, isOverAxis: function (D, F, E) {
                return D > F && D < F + E
            }, isOver: function (D, I, H, G, E, F) {
                return C.ui.isOverAxis(D, H, E) && C.ui.isOverAxis(I, G, F)
            }
        })
    }
})(jQuery);
(function (D, B) {
    if (D.cleanData) {
        var C = D.cleanData;
        D.cleanData = function (G) {
            for (var F = 0, E; (E = G[F]) != null; F++) {
                D(E).triggerHandler("remove")
            }
            C(G)
        }
    } else {
        var A = D.fn.remove;
        D.fn.remove = function (F, E) {
            return this.each(function () {
                if (!E) {
                    if (!F || D.filter(F, [this]).length) {
                        D("*", this).add([this]).each(function () {
                            D(this).triggerHandler("remove")
                        })
                    }
                }
                return A.call(D(this), F, E)
            })
        }
    }
    D.widget = function (I, H, G) {
        var E = I.split(".")[0], F;
        I = I.split(".")[1];
        F = E + "-" + I;
        if (!G) {
            G = H;
            H = D.Widget
        }
        D.expr[":"][F] = function (J) {
            return !!D.data(J, I)
        };
        D[E] = D[E] || {};
        D[E][I] = function (K, J) {
            arguments.length && this._createWidget(K, J)
        };
        H = new H;
        H.options = D.extend(true, {}, H.options);
        D[E][I].prototype = D.extend(true, H, {
            namespace: E,
            widgetName: I,
            widgetEventPrefix: D[E][I].prototype.widgetEventPrefix || I,
            widgetBaseClass: F
        }, G);
        D.widget.bridge(I, D[E][I])
    };
    D.widget.bridge = function (F, E) {
        D.fn[F] = function (I) {
            var G = typeof I === "string", H = Array.prototype.slice.call(arguments, 1), J = this;
            I = !G && H.length ? D.extend.apply(null, [true, I].concat(H)) : I;
            if (G && I.charAt(0) === "_") {
                return J
            }
            G ? this.each(function () {
                var K = D.data(this, F), L = K && D.isFunction(K[I]) ? K[I].apply(K, H) : K;
                if (L !== K && L !== B) {
                    J = L;
                    return false
                }
            }) : this.each(function () {
                var K = D.data(this, F);
                K ? K.option(I || {})._init() : D.data(this, F, new E(I, this))
            });
            return J
        }
    };
    D.Widget = function (F, E) {
        arguments.length && this._createWidget(F, E)
    };
    D.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {disabled: false},
        _createWidget: function (G, F) {
            D.data(F, this.widgetName, this);
            this.element = D(F);
            this.options = D.extend(true, {}, this.options, this._getCreateOptions(), G);
            var E = this;
            this.element.bind("remove." + this.widgetName, function () {
                E.destroy()
            });
            this._create();
            this._trigger("create");
            this._init()
        },
        _getCreateOptions: function () {
            return D.metadata && D.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function () {
        },
        _init: function () {
        },
        destroy: function () {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName);
            this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
        },
        widget: function () {
            return this.element
        },
        option: function (G, F) {
            var E = G;
            if (arguments.length === 0) {
                return D.extend({}, this.options)
            }
            if (typeof G === "string") {
                if (F === B) {
                    return this.options[G]
                }
                E = {};
                E[G] = F
            }
            this._setOptions(E);
            return this
        },
        _setOptions: function (F) {
            var E = this;
            D.each(F, function (H, G) {
                E._setOption(H, G)
            });
            return this
        },
        _setOption: function (F, E) {
            this.options[F] = E;
            if (F === "disabled") {
                this.widget()[E ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", E)
            }
            return this
        },
        enable: function () {
            return this._setOption("disabled", false)
        },
        disable: function () {
            return this._setOption("disabled", true)
        },
        _trigger: function (I, H, G) {
            var E = this.options[I];
            H = D.Event(H);
            H.type = (I === this.widgetEventPrefix ? I : this.widgetEventPrefix + I).toLowerCase();
            G = G || {};
            if (H.originalEvent) {
                I = D.event.props.length;
                for (var F; I;) {
                    F = D.event.props[--I];
                    H[F] = H.originalEvent[F]
                }
            }
            this.element.trigger(H, G);
            return !(D.isFunction(E) && E.call(this.element[0], H, G) === false || H.isDefaultPrevented())
        }
    }
})(jQuery);
(function (A) {
    A.widget("ui.mouse", {
        options: {cancel: ":input,option", distance: 1, delay: 0}, _mouseInit: function () {
            var B = this;
            this.element.bind("mousedown." + this.widgetName, function (C) {
                return B._mouseDown(C)
            }).bind("click." + this.widgetName, function (C) {
                if (true === A.data(C.target, B.widgetName + ".preventClickEvent")) {
                    A.removeData(C.target, B.widgetName + ".preventClickEvent");
                    C.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        }, _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName)
        }, _mouseDown: function (C) {
            C.originalEvent = C.originalEvent || {};
            if (!C.originalEvent.mouseHandled) {
                this._mouseStarted && this._mouseUp(C);
                this._mouseDownEvent = C;
                var D = this, B = C.which == 1, E = typeof this.options.cancel == "string" ? A(C.target).parents().add(C.target).filter(this.options.cancel).length : false;
                if (!B || E || !this._mouseCapture(C)) {
                    return true
                }
                this.mouseDelayMet = !this.options.delay;
                if (!this.mouseDelayMet) {
                    this._mouseDelayTimer = setTimeout(function () {
                        D.mouseDelayMet = true
                    }, this.options.delay)
                }
                if (this._mouseDistanceMet(C) && this._mouseDelayMet(C)) {
                    this._mouseStarted = this._mouseStart(C) !== false;
                    if (!this._mouseStarted) {
                        C.preventDefault();
                        return true
                    }
                }
                true === A.data(C.target, this.widgetName + ".preventClickEvent") && A.removeData(C.target, this.widgetName + ".preventClickEvent");
                this._mouseMoveDelegate = function (F) {
                    return D._mouseMove(F)
                };
                this._mouseUpDelegate = function (F) {
                    return D._mouseUp(F)
                };
                A(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
                C.preventDefault();
                return C.originalEvent.mouseHandled = true
            }
        }, _mouseMove: function (B) {
            if (A.browser.msie && !(document.documentMode >= 9) && !B.button) {
                return this._mouseUp(B)
            }
            if (this._mouseStarted) {
                this._mouseDrag(B);
                return B.preventDefault()
            }
            if (this._mouseDistanceMet(B) && this._mouseDelayMet(B)) {
                (this._mouseStarted = this._mouseStart(this._mouseDownEvent, B) !== false) ? this._mouseDrag(B) : this._mouseUp(B)
            }
            return !this._mouseStarted
        }, _mouseUp: function (B) {
            A(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                B.target == this._mouseDownEvent.target && A.data(B.target, this.widgetName + ".preventClickEvent", true);
                this._mouseStop(B)
            }
            return false
        }, _mouseDistanceMet: function (B) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - B.pageX), Math.abs(this._mouseDownEvent.pageY - B.pageY)) >= this.options.distance
        }, _mouseDelayMet: function () {
            return this.mouseDelayMet
        }, _mouseStart: function () {
        }, _mouseDrag: function () {
        }, _mouseStop: function () {
        }, _mouseCapture: function () {
            return true
        }
    })
})(jQuery);
(function (A) {
    A.widget("ui.draggable", A.ui.mouse, {
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false
        },
        _create: function () {
            if (this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position"))) {
                this.element[0].style.position = "relative"
            }
            this.options.addClasses && this.element.addClass("ui-draggable");
            this.options.disabled && this.element.addClass("ui-draggable-disabled");
            this._mouseInit()
        },
        destroy: function () {
            if (this.element.data("draggable")) {
                this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
                this._mouseDestroy();
                return this
            }
        },
        _mouseCapture: function (B) {
            var C = this.options;
            if (this.helper || C.disabled || A(B.target).is(".ui-resizable-handle")) {
                return false
            }
            this.handle = this._getHandle(B);
            if (!this.handle) {
                return false
            }
            return true
        },
        _mouseStart: function (B) {
            var C = this.options;
            this.helper = this._createHelper(B);
            this._cacheHelperProportions();
            if (A.ui.ddmanager) {
                A.ui.ddmanager.current = this
            }
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.positionAbs = this.element.offset();
            this.offset = {top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left};
            A.extend(this.offset, {
                click: {left: B.pageX - this.offset.left, top: B.pageY - this.offset.top},
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this.position = this._generatePosition(B);
            this.originalPageX = B.pageX;
            this.originalPageY = B.pageY;
            C.cursorAt && this._adjustOffsetFromHelper(C.cursorAt);
            C.containment && this._setContainment();
            if (this._trigger("start", B) === false) {
                this._clear();
                return false
            }
            this._cacheHelperProportions();
            A.ui.ddmanager && !C.dropBehaviour && A.ui.ddmanager.prepareOffsets(this, B);
            this.helper.addClass("ui-draggable-dragging");
            this._mouseDrag(B, true);
            return true
        },
        _mouseDrag: function (B, C) {
            this.position = this._generatePosition(B);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!C) {
                C = this._uiHash();
                if (this._trigger("drag", B, C) === false) {
                    this._mouseUp({});
                    return false
                }
                this.position = C.position
            }
            if (!this.options.axis || this.options.axis != "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis != "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            A.ui.ddmanager && A.ui.ddmanager.drag(this, B);
            return false
        },
        _mouseStop: function (C) {
            var D = false;
            if (A.ui.ddmanager && !this.options.dropBehaviour) {
                D = A.ui.ddmanager.drop(this, C)
            }
            if (this.dropped) {
                D = this.dropped;
                this.dropped = false
            }
            if ((!this.element[0] || !this.element[0].parentNode) && this.options.helper == "original") {
                return false
            }
            if (this.options.revert == "invalid" && !D || this.options.revert == "valid" && D || this.options.revert === true || A.isFunction(this.options.revert) && this.options.revert.call(this.element, D)) {
                var B = this;
                A(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                    B._trigger("stop", C) !== false && B._clear()
                })
            } else {
                this._trigger("stop", C) !== false && this._clear()
            }
            return false
        },
        cancel: function () {
            this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear();
            return this
        },
        _getHandle: function (B) {
            var C = !this.options.handle || !A(this.options.handle, this.element).length ? true : false;
            A(this.options.handle, this.element).find("*").andSelf().each(function () {
                if (this == B.target) {
                    C = true
                }
            });
            return C
        },
        _createHelper: function (B) {
            var C = this.options;
            B = A.isFunction(C.helper) ? A(C.helper.apply(this.element[0], [B])) : C.helper == "clone" ? this.element.clone() : this.element;
            B.parents("body").length || B.appendTo(C.appendTo == "parent" ? this.element[0].parentNode : C.appendTo);
            B[0] != this.element[0] && !/(fixed|absolute)/.test(B.css("position")) && B.css("position", "absolute");
            return B
        },
        _adjustOffsetFromHelper: function (B) {
            if (typeof B == "string") {
                B = B.split(" ")
            }
            if (A.isArray(B)) {
                B = {left: +B[0], top: +B[1] || 0}
            }
            if ("left" in B) {
                this.offset.click.left = B.left + this.margins.left
            }
            if ("right" in B) {
                this.offset.click.left = this.helperProportions.width - B.right + this.margins.left
            }
            if ("top" in B) {
                this.offset.click.top = B.top + this.margins.top
            }
            if ("bottom" in B) {
                this.offset.click.top = this.helperProportions.height - B.bottom + this.margins.top
            }
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var B = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && A.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                B.left += this.scrollParent.scrollLeft();
                B.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && A.browser.msie) {
                B = {top: 0, left: 0}
            }
            return {
                top: B.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: B.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var B = this.element.position();
                return {
                    top: B.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: B.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {top: 0, left: 0}
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
        },
        _setContainment: function () {
            var C = this.options;
            if (C.containment == "parent") {
                C.containment = this.helper[0].parentNode
            }
            if (C.containment == "document" || C.containment == "window") {
                this.containment = [(C.containment == "document" ? 0 : A(window).scrollLeft()) - this.offset.relative.left - this.offset.parent.left, (C.containment == "document" ? 0 : A(window).scrollTop()) - this.offset.relative.top - this.offset.parent.top, (C.containment == "document" ? 0 : A(window).scrollLeft()) + A(C.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (C.containment == "document" ? 0 : A(window).scrollTop()) + (A(C.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!/^(document|window|parent)$/.test(C.containment) && C.containment.constructor != Array) {
                var D = A(C.containment)[0];
                if (D) {
                    C = A(C.containment).offset();
                    var B = A(D).css("overflow") != "hidden";
                    this.containment = [C.left + (parseInt(A(D).css("borderLeftWidth"), 10) || 0) + (parseInt(A(D).css("paddingLeft"), 10) || 0), C.top + (parseInt(A(D).css("borderTopWidth"), 10) || 0) + (parseInt(A(D).css("paddingTop"), 10) || 0), C.left + (B ? Math.max(D.scrollWidth, D.offsetWidth) : D.offsetWidth) - (parseInt(A(D).css("borderLeftWidth"), 10) || 0) - (parseInt(A(D).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, C.top + (B ? Math.max(D.scrollHeight, D.offsetHeight) : D.offsetHeight) - (parseInt(A(D).css("borderTopWidth"), 10) || 0) - (parseInt(A(D).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom]
                }
            } else {
                if (C.containment.constructor == Array) {
                    this.containment = C.containment
                }
            }
        },
        _convertPositionTo: function (C, D) {
            if (!D) {
                D = this.position
            }
            C = C == "absolute" ? 1 : -1;
            var B = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && A.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, E = /(html|body)/i.test(B[0].tagName);
            return {
                top: D.top + this.offset.relative.top * C + this.offset.parent.top * C - (A.browser.safari && A.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : E ? 0 : B.scrollTop()) * C),
                left: D.left + this.offset.relative.left * C + this.offset.parent.left * C - (A.browser.safari && A.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : E ? 0 : B.scrollLeft()) * C)
            }
        },
        _generatePosition: function (C) {
            var D = this.options, B = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && A.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, G = /(html|body)/i.test(B[0].tagName), F = C.pageX, E = C.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (C.pageX - this.offset.click.left < this.containment[0]) {
                        F = this.containment[0] + this.offset.click.left
                    }
                    if (C.pageY - this.offset.click.top < this.containment[1]) {
                        E = this.containment[1] + this.offset.click.top
                    }
                    if (C.pageX - this.offset.click.left > this.containment[2]) {
                        F = this.containment[2] + this.offset.click.left
                    }
                    if (C.pageY - this.offset.click.top > this.containment[3]) {
                        E = this.containment[3] + this.offset.click.top
                    }
                }
                if (D.grid) {
                    E = this.originalPageY + Math.round((E - this.originalPageY) / D.grid[1]) * D.grid[1];
                    E = this.containment ? !(E - this.offset.click.top < this.containment[1] || E - this.offset.click.top > this.containment[3]) ? E : !(E - this.offset.click.top < this.containment[1]) ? E - D.grid[1] : E + D.grid[1] : E;
                    F = this.originalPageX + Math.round((F - this.originalPageX) / D.grid[0]) * D.grid[0];
                    F = this.containment ? !(F - this.offset.click.left < this.containment[0] || F - this.offset.click.left > this.containment[2]) ? F : !(F - this.offset.click.left < this.containment[0]) ? F - D.grid[0] : F + D.grid[0] : F
                }
            }
            return {
                top: E - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (A.browser.safari && A.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : G ? 0 : B.scrollTop()),
                left: F - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (A.browser.safari && A.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : G ? 0 : B.scrollLeft())
            }
        },
        _clear: function () {
            this.helper.removeClass("ui-draggable-dragging");
            this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove();
            this.helper = null;
            this.cancelHelperRemoval = false
        },
        _trigger: function (C, D, B) {
            B = B || this._uiHash();
            A.ui.plugin.call(this, C, [D, B]);
            if (C == "drag") {
                this.positionAbs = this._convertPositionTo("absolute")
            }
            return A.Widget.prototype._trigger.call(this, C, D, B)
        },
        plugins: {},
        _uiHash: function () {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    A.extend(A.ui.draggable, {version: "1.8.11"});
    A.ui.plugin.add("draggable", "connectToSortable", {
        start: function (C, D) {
            var B = A(this).data("draggable"), F = B.options, E = A.extend({}, D, {item: B.element});
            B.sortables = [];
            A(F.connectToSortable).each(function () {
                var G = A.data(this, "sortable");
                if (G && !G.options.disabled) {
                    B.sortables.push({instance: G, shouldRevert: G.options.revert});
                    G.refreshPositions();
                    G._trigger("activate", C, E)
                }
            })
        }, stop: function (C, D) {
            var B = A(this).data("draggable"), E = A.extend({}, D, {item: B.element});
            A.each(B.sortables, function () {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    B.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) {
                        this.instance.options.revert = true
                    }
                    this.instance._mouseStop(C);
                    this.instance.options.helper = this.instance.options._helper;
                    B.options.helper == "original" && this.instance.currentItem.css({top: "auto", left: "auto"})
                } else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", C, E)
                }
            })
        }, drag: function (C, D) {
            var B = A(this).data("draggable"), E = this;
            A.each(B.sortables, function () {
                this.instance.positionAbs = B.positionAbs;
                this.instance.helperProportions = B.helperProportions;
                this.instance.offset.click = B.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = A(E).clone().appendTo(this.instance.element).data("sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function () {
                            return D.helper[0]
                        };
                        C.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(C, true);
                        this.instance._mouseStart(C, true, true);
                        this.instance.offset.click.top = B.offset.click.top;
                        this.instance.offset.click.left = B.offset.click.left;
                        this.instance.offset.parent.left -= B.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= B.offset.parent.top - this.instance.offset.parent.top;
                        B._trigger("toSortable", C);
                        B.dropped = this.instance.element;
                        B.currentItem = B.element;
                        this.instance.fromOutside = B
                    }
                    this.instance.currentItem && this.instance._mouseDrag(C)
                } else {
                    if (this.instance.isOver) {
                        this.instance.isOver = 0;
                        this.instance.cancelHelperRemoval = true;
                        this.instance.options.revert = false;
                        this.instance._trigger("out", C, this.instance._uiHash(this.instance));
                        this.instance._mouseStop(C, true);
                        this.instance.options.helper = this.instance.options._helper;
                        this.instance.currentItem.remove();
                        this.instance.placeholder && this.instance.placeholder.remove();
                        B._trigger("fromSortable", C);
                        B.dropped = false
                    }
                }
            })
        }
    });
    A.ui.plugin.add("draggable", "cursor", {
        start: function () {
            var B = A("body"), C = A(this).data("draggable").options;
            if (B.css("cursor")) {
                C._cursor = B.css("cursor")
            }
            B.css("cursor", C.cursor)
        }, stop: function () {
            var B = A(this).data("draggable").options;
            B._cursor && A("body").css("cursor", B._cursor)
        }
    });
    A.ui.plugin.add("draggable", "iframeFix", {
        start: function () {
            var B = A(this).data("draggable").options;
            A(B.iframeFix === true ? "iframe" : B.iframeFix).each(function () {
                A('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1000
                }).css(A(this).offset()).appendTo("body")
            })
        }, stop: function () {
            A("div.ui-draggable-iframeFix").each(function () {
                this.parentNode.removeChild(this)
            })
        }
    });
    A.ui.plugin.add("draggable", "opacity", {
        start: function (B, C) {
            B = A(C.helper);
            C = A(this).data("draggable").options;
            if (B.css("opacity")) {
                C._opacity = B.css("opacity")
            }
            B.css("opacity", C.opacity)
        }, stop: function (B, C) {
            B = A(this).data("draggable").options;
            B._opacity && A(C.helper).css("opacity", B._opacity)
        }
    });
    A.ui.plugin.add("draggable", "scroll", {
        start: function () {
            var B = A(this).data("draggable");
            if (B.scrollParent[0] != document && B.scrollParent[0].tagName != "HTML") {
                B.overflowOffset = B.scrollParent.offset()
            }
        }, drag: function (C) {
            var D = A(this).data("draggable"), B = D.options, E = false;
            if (D.scrollParent[0] != document && D.scrollParent[0].tagName != "HTML") {
                if (!B.axis || B.axis != "x") {
                    if (D.overflowOffset.top + D.scrollParent[0].offsetHeight - C.pageY < B.scrollSensitivity) {
                        D.scrollParent[0].scrollTop = E = D.scrollParent[0].scrollTop + B.scrollSpeed
                    } else {
                        if (C.pageY - D.overflowOffset.top < B.scrollSensitivity) {
                            D.scrollParent[0].scrollTop = E = D.scrollParent[0].scrollTop - B.scrollSpeed
                        }
                    }
                }
                if (!B.axis || B.axis != "y") {
                    if (D.overflowOffset.left + D.scrollParent[0].offsetWidth - C.pageX < B.scrollSensitivity) {
                        D.scrollParent[0].scrollLeft = E = D.scrollParent[0].scrollLeft + B.scrollSpeed
                    } else {
                        if (C.pageX - D.overflowOffset.left < B.scrollSensitivity) {
                            D.scrollParent[0].scrollLeft = E = D.scrollParent[0].scrollLeft - B.scrollSpeed
                        }
                    }
                }
            } else {
                if (!B.axis || B.axis != "x") {
                    if (C.pageY - A(document).scrollTop() < B.scrollSensitivity) {
                        E = A(document).scrollTop(A(document).scrollTop() - B.scrollSpeed)
                    } else {
                        if (A(window).height() - (C.pageY - A(document).scrollTop()) < B.scrollSensitivity) {
                            E = A(document).scrollTop(A(document).scrollTop() + B.scrollSpeed)
                        }
                    }
                }
                if (!B.axis || B.axis != "y") {
                    if (C.pageX - A(document).scrollLeft() < B.scrollSensitivity) {
                        E = A(document).scrollLeft(A(document).scrollLeft() - B.scrollSpeed)
                    } else {
                        if (A(window).width() - (C.pageX - A(document).scrollLeft()) < B.scrollSensitivity) {
                            E = A(document).scrollLeft(A(document).scrollLeft() + B.scrollSpeed)
                        }
                    }
                }
            }
            E !== false && A.ui.ddmanager && !B.dropBehaviour && A.ui.ddmanager.prepareOffsets(D, C)
        }
    });
    A.ui.plugin.add("draggable", "snap", {
        start: function () {
            var B = A(this).data("draggable"), C = B.options;
            B.snapElements = [];
            A(C.snap.constructor != String ? C.snap.items || ":data(draggable)" : C.snap).each(function () {
                var D = A(this), E = D.offset();
                this != B.element[0] && B.snapElements.push({
                    item: this,
                    width: D.outerWidth(),
                    height: D.outerHeight(),
                    top: E.top,
                    left: E.left
                })
            })
        }, drag: function (S, T) {
            for (var R = A(this).data("draggable"), Q = R.options, P = Q.snapTolerance, O = T.offset.left, I = O + R.helperProportions.width, J = T.offset.top, G = J + R.helperProportions.height, K = R.snapElements.length - 1; K >= 0; K--) {
                var D = R.snapElements[K].left, M = D + R.snapElements[K].width, H = R.snapElements[K].top, N = H + R.snapElements[K].height;
                if (D - P < O && O < M + P && H - P < J && J < N + P || D - P < O && O < M + P && H - P < G && G < N + P || D - P < I && I < M + P && H - P < J && J < N + P || D - P < I && I < M + P && H - P < G && G < N + P) {
                    if (Q.snapMode != "inner") {
                        var L = Math.abs(H - G) <= P, E = Math.abs(N - J) <= P, C = Math.abs(D - I) <= P, B = Math.abs(M - O) <= P;
                        if (L) {
                            T.position.top = R._convertPositionTo("relative", {
                                    top: H - R.helperProportions.height,
                                    left: 0
                                }).top - R.margins.top
                        }
                        if (E) {
                            T.position.top = R._convertPositionTo("relative", {top: N, left: 0}).top - R.margins.top
                        }
                        if (C) {
                            T.position.left = R._convertPositionTo("relative", {
                                    top: 0,
                                    left: D - R.helperProportions.width
                                }).left - R.margins.left
                        }
                        if (B) {
                            T.position.left = R._convertPositionTo("relative", {top: 0, left: M}).left - R.margins.left
                        }
                    }
                    var F = L || E || C || B;
                    if (Q.snapMode != "outer") {
                        L = Math.abs(H - J) <= P;
                        E = Math.abs(N - G) <= P;
                        C = Math.abs(D - O) <= P;
                        B = Math.abs(M - I) <= P;
                        if (L) {
                            T.position.top = R._convertPositionTo("relative", {top: H, left: 0}).top - R.margins.top
                        }
                        if (E) {
                            T.position.top = R._convertPositionTo("relative", {
                                    top: N - R.helperProportions.height,
                                    left: 0
                                }).top - R.margins.top
                        }
                        if (C) {
                            T.position.left = R._convertPositionTo("relative", {top: 0, left: D}).left - R.margins.left
                        }
                        if (B) {
                            T.position.left = R._convertPositionTo("relative", {
                                    top: 0,
                                    left: M - R.helperProportions.width
                                }).left - R.margins.left
                        }
                    }
                    if (!R.snapElements[K].snapping && (L || E || C || B || F)) {
                        R.options.snap.snap && R.options.snap.snap.call(R.element, S, A.extend(R._uiHash(), {snapItem: R.snapElements[K].item}))
                    }
                    R.snapElements[K].snapping = L || E || C || B || F
                } else {
                    R.snapElements[K].snapping && R.options.snap.release && R.options.snap.release.call(R.element, S, A.extend(R._uiHash(), {snapItem: R.snapElements[K].item}));
                    R.snapElements[K].snapping = false
                }
            }
        }
    });
    A.ui.plugin.add("draggable", "stack", {
        start: function () {
            var B = A(this).data("draggable").options;
            B = A.makeArray(A(B.stack)).sort(function (D, E) {
                return (parseInt(A(D).css("zIndex"), 10) || 0) - (parseInt(A(E).css("zIndex"), 10) || 0)
            });
            if (B.length) {
                var C = parseInt(B[0].style.zIndex) || 0;
                A(B).each(function (D) {
                    this.style.zIndex = C + D
                });
                this[0].style.zIndex = C + B.length
            }
        }
    });
    A.ui.plugin.add("draggable", "zIndex", {
        start: function (B, C) {
            B = A(C.helper);
            C = A(this).data("draggable").options;
            if (B.css("zIndex")) {
                C._zIndex = B.css("zIndex")
            }
            B.css("zIndex", C.zIndex)
        }, stop: function (B, C) {
            B = A(this).data("draggable").options;
            B._zIndex && A(C.helper).css("zIndex", B._zIndex)
        }
    })
})(jQuery);
(function (A) {
    A.widget("ui.droppable", {
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: false,
            addClasses: true,
            greedy: false,
            hoverClass: false,
            scope: "default",
            tolerance: "intersect"
        },
        _create: function () {
            var B = this.options, C = B.accept;
            this.isover = 0;
            this.isout = 1;
            this.accept = A.isFunction(C) ? C : function (D) {
                return D.is(C)
            };
            this.proportions = {width: this.element[0].offsetWidth, height: this.element[0].offsetHeight};
            A.ui.ddmanager.droppables[B.scope] = A.ui.ddmanager.droppables[B.scope] || [];
            A.ui.ddmanager.droppables[B.scope].push(this);
            B.addClasses && this.element.addClass("ui-droppable")
        },
        destroy: function () {
            for (var B = A.ui.ddmanager.droppables[this.options.scope], C = 0; C < B.length; C++) {
                B[C] == this && B.splice(C, 1)
            }
            this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
            return this
        },
        _setOption: function (B, C) {
            if (B == "accept") {
                this.accept = A.isFunction(C) ? C : function (D) {
                    return D.is(C)
                }
            }
            A.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function (B) {
            var C = A.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass);
            C && this._trigger("activate", B, this.ui(C))
        },
        _deactivate: function (B) {
            var C = A.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass);
            C && this._trigger("deactivate", B, this.ui(C))
        },
        _over: function (B) {
            var C = A.ui.ddmanager.current;
            if (!(!C || (C.currentItem || C.element)[0] == this.element[0])) {
                if (this.accept.call(this.element[0], C.currentItem || C.element)) {
                    this.options.hoverClass && this.element.addClass(this.options.hoverClass);
                    this._trigger("over", B, this.ui(C))
                }
            }
        },
        _out: function (B) {
            var C = A.ui.ddmanager.current;
            if (!(!C || (C.currentItem || C.element)[0] == this.element[0])) {
                if (this.accept.call(this.element[0], C.currentItem || C.element)) {
                    this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
                    this._trigger("out", B, this.ui(C))
                }
            }
        },
        _drop: function (C, D) {
            var B = D || A.ui.ddmanager.current;
            if (!B || (B.currentItem || B.element)[0] == this.element[0]) {
                return false
            }
            var E = false;
            this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function () {
                var F = A.data(this, "droppable");
                if (F.options.greedy && !F.options.disabled && F.options.scope == B.options.scope && F.accept.call(F.element[0], B.currentItem || B.element) && A.ui.intersect(B, A.extend(F, {offset: F.element.offset()}), F.options.tolerance)) {
                    E = true;
                    return false
                }
            });
            if (E) {
                return false
            }
            if (this.accept.call(this.element[0], B.currentItem || B.element)) {
                this.options.activeClass && this.element.removeClass(this.options.activeClass);
                this.options.hoverClass && this.element.removeClass(this.options.hoverClass);
                this._trigger("drop", C, this.ui(B));
                return this.element
            }
            return false
        },
        ui: function (B) {
            return {
                draggable: B.currentItem || B.element,
                helper: B.helper,
                position: B.position,
                offset: B.positionAbs
            }
        }
    });
    A.extend(A.ui.droppable, {version: "1.8.11"});
    A.ui.intersect = function (L, B, K) {
        if (!B.offset) {
            return false
        }
        var J = (L.positionAbs || L.position.absolute).left, I = J + L.helperProportions.width, H = (L.positionAbs || L.position.absolute).top, E = H + L.helperProportions.height, F = B.offset.left, D = F + B.proportions.width, G = B.offset.top, C = G + B.proportions.height;
        switch (K) {
            case"fit":
                return F <= J && I <= D && G <= H && E <= C;
            case"intersect":
                return F < J + L.helperProportions.width / 2 && I - L.helperProportions.width / 2 < D && G < H + L.helperProportions.height / 2 && E - L.helperProportions.height / 2 < C;
            case"pointer":
                return A.ui.isOver((L.positionAbs || L.position.absolute).top + (L.clickOffset || L.offset.click).top, (L.positionAbs || L.position.absolute).left + (L.clickOffset || L.offset.click).left, G, F, B.proportions.height, B.proportions.width);
            case"touch":
                return (H >= G && H <= C || E >= G && E <= C || H < G && E > C) && (J >= F && J <= D || I >= F && I <= D || J < F && I > D);
            default:
                return false
        }
    };
    A.ui.ddmanager = {
        current: null, droppables: {"default": []}, prepareOffsets: function (C, D) {
            var B = A.ui.ddmanager.droppables[C.options.scope] || [], H = D ? D.type : null, G = (C.currentItem || C.element).find(":data(droppable)").andSelf(), F = 0;
            G:for (; F < B.length; F++) {
                if (!(B[F].options.disabled || C && !B[F].accept.call(B[F].element[0], C.currentItem || C.element))) {
                    for (var E = 0; E < G.length; E++) {
                        if (G[E] == B[F].element[0]) {
                            B[F].proportions.height = 0;
                            continue G
                        }
                    }
                    B[F].visible = B[F].element.css("display") != "none";
                    if (B[F].visible) {
                        H == "mousedown" && B[F]._activate.call(B[F], D);
                        B[F].offset = B[F].element.offset();
                        B[F].proportions = {width: B[F].element[0].offsetWidth, height: B[F].element[0].offsetHeight}
                    }
                }
            }
        }, drop: function (C, D) {
            var B = false;
            A.each(A.ui.ddmanager.droppables[C.options.scope] || [], function () {
                if (this.options) {
                    if (!this.options.disabled && this.visible && A.ui.intersect(C, this, this.options.tolerance)) {
                        B = B || this._drop.call(this, D)
                    }
                    if (!this.options.disabled && this.visible && this.accept.call(this.element[0], C.currentItem || C.element)) {
                        this.isout = 1;
                        this.isover = 0;
                        this._deactivate.call(this, D)
                    }
                }
            });
            return B
        }, drag: function (B, C) {
            B.options.refreshPositions && A.ui.ddmanager.prepareOffsets(B, C);
            A.each(A.ui.ddmanager.droppables[B.options.scope] || [], function () {
                if (!(this.options.disabled || this.greedyChild || !this.visible)) {
                    var D = A.ui.intersect(B, this, this.options.tolerance);
                    if (D = !D && this.isover == 1 ? "isout" : D && this.isover == 0 ? "isover" : null) {
                        var F;
                        if (this.options.greedy) {
                            var E = this.element.parents(":data(droppable):eq(0)");
                            if (E.length) {
                                F = A.data(E[0], "droppable");
                                F.greedyChild = D == "isover" ? 1 : 0
                            }
                        }
                        if (F && D == "isover") {
                            F.isover = 0;
                            F.isout = 1;
                            F._out.call(F, C)
                        }
                        this[D] = 1;
                        this[D == "isout" ? "isover" : "isout"] = 0;
                        this[D == "isover" ? "_over" : "_out"].call(this, C);
                        if (F && D == "isout") {
                            F.isout = 0;
                            F.isover = 1;
                            F._over.call(F, C)
                        }
                    }
                }
            })
        }
    }
})(jQuery);
(function (C) {
    C.widget("ui.resizable", C.ui.mouse, {
        widgetEventPrefix: "resize",
        options: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            containment: false,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 1000
        },
        _create: function () {
            var D = this, I = this.options;
            this.element.addClass("ui-resizable");
            C.extend(this, {
                _aspectRatio: !!I.aspectRatio,
                aspectRatio: I.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: I.helper || I.ghost || I.animate ? I.helper || "ui-resizable-helper" : null
            });
            if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
                /relative/.test(this.element.css("position")) && C.browser.opera && this.element.css({
                    position: "relative",
                    top: "auto",
                    left: "auto"
                });
                this.element.wrap(C('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent().data("resizable", this.element.data("resizable"));
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                });
                this.originalElement.css({marginLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0});
                this.originalResizeStyle = this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css({margin: this.originalElement.css("margin")});
                this._proportionallyResize()
            }
            this.handles = I.handles || (!C(".ui-resizable-handle", this.element).length ? "e,s,se" : {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw"
                });
            if (this.handles.constructor == String) {
                if (this.handles == "all") {
                    this.handles = "n,e,s,w,se,sw,ne,nw"
                }
                var H = this.handles.split(",");
                this.handles = {};
                for (var G = 0; G < H.length; G++) {
                    var E = C.trim(H[G]), F = C('<div class="ui-resizable-handle ' + ("ui-resizable-" + E) + '"></div>');
                    /sw|se|ne|nw/.test(E) && F.css({zIndex: ++I.zIndex});
                    "se" == E && F.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
                    this.handles[E] = ".ui-resizable-" + E;
                    this.element.append(F)
                }
            }
            this._renderAxis = function (M) {
                M = M || this.element;
                for (var J in this.handles) {
                    if (this.handles[J].constructor == String) {
                        this.handles[J] = C(this.handles[J], this.element).show()
                    }
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        var K = C(this.handles[J], this.element), L = 0;
                        L = /sw|ne|nw|se|n|s/.test(J) ? K.outerHeight() : K.outerWidth();
                        K = ["padding", /ne|nw|n/.test(J) ? "Top" : /se|sw|s/.test(J) ? "Bottom" : /^e$/.test(J) ? "Right" : "Left"].join("");
                        M.css(K, L);
                        this._proportionallyResize()
                    }
                    C(this.handles[J])
                }
            };
            this._renderAxis(this.element);
            this._handles = C(".ui-resizable-handle", this.element).disableSelection();
            this._handles.mouseover(function () {
                if (!D.resizing) {
                    if (this.className) {
                        var J = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
                    }
                    D.axis = J && J[1] ? J[1] : "se"
                }
            });
            if (I.autoHide) {
                this._handles.hide();
                C(this.element).addClass("ui-resizable-autohide").hover(function () {
                    C(this).removeClass("ui-resizable-autohide");
                    D._handles.show()
                }, function () {
                    if (!D.resizing) {
                        C(this).addClass("ui-resizable-autohide");
                        D._handles.hide()
                    }
                })
            }
            this._mouseInit()
        },
        destroy: function () {
            this._mouseDestroy();
            var D = function (F) {
                C(F).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                D(this.element);
                var E = this.element;
                E.after(this.originalElement.css({
                    position: E.css("position"),
                    width: E.outerWidth(),
                    height: E.outerHeight(),
                    top: E.css("top"),
                    left: E.css("left")
                })).remove()
            }
            this.originalElement.css("resize", this.originalResizeStyle);
            D(this.originalElement);
            return this
        },
        _mouseCapture: function (D) {
            var F = false;
            for (var E in this.handles) {
                if (C(this.handles[E])[0] == D.target) {
                    F = true
                }
            }
            return !this.options.disabled && F
        },
        _mouseStart: function (D) {
            var H = this.options, G = this.element.position(), F = this.element;
            this.resizing = true;
            this.documentScroll = {top: C(document).scrollTop(), left: C(document).scrollLeft()};
            if (F.is(".ui-draggable") || /absolute/.test(F.css("position"))) {
                F.css({position: "absolute", top: G.top, left: G.left})
            }
            C.browser.opera && /relative/.test(F.css("position")) && F.css({
                position: "relative",
                top: "auto",
                left: "auto"
            });
            this._renderProxy();
            G = A(this.helper.css("left"));
            var E = A(this.helper.css("top"));
            if (H.containment) {
                G += C(H.containment).scrollLeft() || 0;
                E += C(H.containment).scrollTop() || 0
            }
            this.offset = this.helper.offset();
            this.position = {left: G, top: E};
            this.size = this._helper ? {width: F.outerWidth(), height: F.outerHeight()} : {
                width: F.width(),
                height: F.height()
            };
            this.originalSize = this._helper ? {width: F.outerWidth(), height: F.outerHeight()} : {
                width: F.width(),
                height: F.height()
            };
            this.originalPosition = {left: G, top: E};
            this.sizeDiff = {width: F.outerWidth() - F.width(), height: F.outerHeight() - F.height()};
            this.originalMousePosition = {left: D.pageX, top: D.pageY};
            this.aspectRatio = typeof H.aspectRatio == "number" ? H.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
            H = C(".ui-resizable-" + this.axis).css("cursor");
            C("body").css("cursor", H == "auto" ? this.axis + "-resize" : H);
            F.addClass("ui-resizable-resizing");
            this._propagate("start", D);
            return true
        },
        _mouseDrag: function (D) {
            var G = this.helper, F = this.originalMousePosition, E = this._change[this.axis];
            if (!E) {
                return false
            }
            F = E.apply(this, [D, D.pageX - F.left || 0, D.pageY - F.top || 0]);
            if (this._aspectRatio || D.shiftKey) {
                F = this._updateRatio(F, D)
            }
            F = this._respectSize(F, D);
            this._propagate("resize", D);
            G.css({
                top: this.position.top + "px",
                left: this.position.left + "px",
                width: this.size.width + "px",
                height: this.size.height + "px"
            });
            !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize();
            this._updateCache(F);
            this._trigger("resize", D, this.ui());
            return false
        },
        _mouseStop: function (D) {
            this.resizing = false;
            var I = this.options, H = this;
            if (this._helper) {
                var G = this._proportionallyResizeElements, E = G.length && /textarea/i.test(G[0].nodeName);
                G = E && C.ui.hasScroll(G[0], "left") ? 0 : H.sizeDiff.height;
                E = E ? 0 : H.sizeDiff.width;
                E = {width: H.helper.width() - E, height: H.helper.height() - G};
                G = parseInt(H.element.css("left"), 10) + (H.position.left - H.originalPosition.left) || null;
                var F = parseInt(H.element.css("top"), 10) + (H.position.top - H.originalPosition.top) || null;
                I.animate || this.element.css(C.extend(E, {top: F, left: G}));
                H.helper.height(H.size.height);
                H.helper.width(H.size.width);
                this._helper && !I.animate && this._proportionallyResize()
            }
            C("body").css("cursor", "auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop", D);
            this._helper && this.helper.remove();
            return false
        },
        _updateCache: function (D) {
            this.offset = this.helper.offset();
            if (B(D.left)) {
                this.position.left = D.left
            }
            if (B(D.top)) {
                this.position.top = D.top
            }
            if (B(D.height)) {
                this.size.height = D.height
            }
            if (B(D.width)) {
                this.size.width = D.width
            }
        },
        _updateRatio: function (D) {
            var G = this.position, F = this.size, E = this.axis;
            if (D.height) {
                D.width = F.height * this.aspectRatio
            } else {
                if (D.width) {
                    D.height = F.width / this.aspectRatio
                }
            }
            if (E == "sw") {
                D.left = G.left + (F.width - D.width);
                D.top = null
            }
            if (E == "nw") {
                D.top = G.top + (F.height - D.height);
                D.left = G.left + (F.width - D.width)
            }
            return D
        },
        _respectSize: function (M) {
            var L = this.options, K = this.axis, J = B(M.width) && L.maxWidth && L.maxWidth < M.width, F = B(M.height) && L.maxHeight && L.maxHeight < M.height, G = B(M.width) && L.minWidth && L.minWidth > M.width, E = B(M.height) && L.minHeight && L.minHeight > M.height;
            if (G) {
                M.width = L.minWidth
            }
            if (E) {
                M.height = L.minHeight
            }
            if (J) {
                M.width = L.maxWidth
            }
            if (F) {
                M.height = L.maxHeight
            }
            var H = this.originalPosition.left + this.originalSize.width, D = this.position.top + this.size.height, I = /sw|nw|w/.test(K);
            K = /nw|ne|n/.test(K);
            if (G && I) {
                M.left = H - L.minWidth
            }
            if (J && I) {
                M.left = H - L.maxWidth
            }
            if (E && K) {
                M.top = D - L.minHeight
            }
            if (F && K) {
                M.top = D - L.maxHeight
            }
            if ((L = !M.width && !M.height) && !M.left && M.top) {
                M.top = null
            } else {
                if (L && !M.top && M.left) {
                    M.left = null
                }
            }
            return M
        },
        _proportionallyResize: function () {
            if (this._proportionallyResizeElements.length) {
                for (var D = this.helper || this.element, H = 0; H < this._proportionallyResizeElements.length; H++) {
                    var G = this._proportionallyResizeElements[H];
                    if (!this.borderDif) {
                        var F = [G.css("borderTopWidth"), G.css("borderRightWidth"), G.css("borderBottomWidth"), G.css("borderLeftWidth")], E = [G.css("paddingTop"), G.css("paddingRight"), G.css("paddingBottom"), G.css("paddingLeft")];
                        this.borderDif = C.map(F, function (I, J) {
                            I = parseInt(I, 10) || 0;
                            J = parseInt(E[J], 10) || 0;
                            return I + J
                        })
                    }
                    C.browser.msie && (C(D).is(":hidden") || C(D).parents(":hidden").length) || G.css({
                        height: D.height() - this.borderDif[0] - this.borderDif[2] || 0,
                        width: D.width() - this.borderDif[1] - this.borderDif[3] || 0
                    })
                }
            }
        },
        _renderProxy: function () {
            var D = this.options;
            this.elementOffset = this.element.offset();
            if (this._helper) {
                this.helper = this.helper || C('<div style="overflow:hidden;"></div>');
                var F = C.browser.msie && C.browser.version < 7, E = F ? 1 : 0;
                F = F ? 2 : -1;
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() + F,
                    height: this.element.outerHeight() + F,
                    position: "absolute",
                    left: this.elementOffset.left - E + "px",
                    top: this.elementOffset.top - E + "px",
                    zIndex: ++D.zIndex
                });
                this.helper.appendTo("body").disableSelection()
            } else {
                this.helper = this.element
            }
        },
        _change: {
            e: function (D, E) {
                return {width: this.originalSize.width + E}
            }, w: function (D, E) {
                return {left: this.originalPosition.left + E, width: this.originalSize.width - E}
            }, n: function (D, F, E) {
                return {top: this.originalPosition.top + E, height: this.originalSize.height - E}
            }, s: function (D, F, E) {
                return {height: this.originalSize.height + E}
            }, se: function (D, F, E) {
                return C.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [D, F, E]))
            }, sw: function (D, F, E) {
                return C.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [D, F, E]))
            }, ne: function (D, F, E) {
                return C.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [D, F, E]))
            }, nw: function (D, F, E) {
                return C.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [D, F, E]))
            }
        },
        _propagate: function (D, E) {
            C.ui.plugin.call(this, D, [E, this.ui()]);
            D != "resize" && this._trigger(D, E, this.ui())
        },
        plugins: {},
        ui: function () {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    C.extend(C.ui.resizable, {version: "1.8.11"});
    C.ui.plugin.add("resizable", "alsoResize", {
        start: function () {
            var D = C(this).data("resizable").options, E = function (F) {
                C(F).each(function () {
                    var G = C(this);
                    G.data("resizable-alsoresize", {
                        width: parseInt(G.width(), 10),
                        height: parseInt(G.height(), 10),
                        left: parseInt(G.css("left"), 10),
                        top: parseInt(G.css("top"), 10),
                        position: G.css("position")
                    })
                })
            };
            if (typeof D.alsoResize == "object" && !D.alsoResize.parentNode) {
                if (D.alsoResize.length) {
                    D.alsoResize = D.alsoResize[0];
                    E(D.alsoResize)
                } else {
                    C.each(D.alsoResize, function (F) {
                        E(F)
                    })
                }
            } else {
                E(D.alsoResize)
            }
        }, resize: function (D, J) {
            var I = C(this).data("resizable");
            D = I.options;
            var H = I.originalSize, E = I.originalPosition, F = {
                height: I.size.height - H.height || 0,
                width: I.size.width - H.width || 0,
                top: I.position.top - E.top || 0,
                left: I.position.left - E.left || 0
            }, G = function (K, L) {
                C(K).each(function () {
                    var N = C(this), P = C(this).data("resizable-alsoresize"), O = {}, M = L && L.length ? L : N.parents(J.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                    C.each(M, function (R, Q) {
                        if ((R = (P[Q] || 0) + (F[Q] || 0)) && R >= 0) {
                            O[Q] = R || null
                        }
                    });
                    if (C.browser.opera && /relative/.test(N.css("position"))) {
                        I._revertToRelativePosition = true;
                        N.css({position: "absolute", top: "auto", left: "auto"})
                    }
                    N.css(O)
                })
            };
            typeof D.alsoResize == "object" && !D.alsoResize.nodeType ? C.each(D.alsoResize, function (K, L) {
                G(K, L)
            }) : G(D.alsoResize)
        }, stop: function () {
            var D = C(this).data("resizable"), F = D.options, E = function (G) {
                C(G).each(function () {
                    var H = C(this);
                    H.css({position: H.data("resizable-alsoresize").position})
                })
            };
            if (D._revertToRelativePosition) {
                D._revertToRelativePosition = false;
                typeof F.alsoResize == "object" && !F.alsoResize.nodeType ? C.each(F.alsoResize, function (G) {
                    E(G)
                }) : E(F.alsoResize)
            }
            C(this).removeData("resizable-alsoresize")
        }
    });
    C.ui.plugin.add("resizable", "animate", {
        stop: function (D) {
            var J = C(this).data("resizable"), I = J.options, H = J._proportionallyResizeElements, E = H.length && /textarea/i.test(H[0].nodeName), F = E && C.ui.hasScroll(H[0], "left") ? 0 : J.sizeDiff.height;
            E = {width: J.size.width - (E ? 0 : J.sizeDiff.width), height: J.size.height - F};
            F = parseInt(J.element.css("left"), 10) + (J.position.left - J.originalPosition.left) || null;
            var G = parseInt(J.element.css("top"), 10) + (J.position.top - J.originalPosition.top) || null;
            J.element.animate(C.extend(E, G && F ? {top: G, left: F} : {}), {
                duration: I.animateDuration,
                easing: I.animateEasing,
                step: function () {
                    var K = {
                        width: parseInt(J.element.css("width"), 10),
                        height: parseInt(J.element.css("height"), 10),
                        top: parseInt(J.element.css("top"), 10),
                        left: parseInt(J.element.css("left"), 10)
                    };
                    H && H.length && C(H[0]).css({width: K.width, height: K.height});
                    J._updateCache(K);
                    J._propagate("resize", D)
                }
            })
        }
    });
    C.ui.plugin.add("resizable", "containment", {
        start: function () {
            var D = C(this).data("resizable"), J = D.element, I = D.options.containment;
            if (J = I instanceof C ? I.get(0) : /parent/.test(I) ? J.parent().get(0) : I) {
                D.containerElement = C(J);
                if (/document/.test(I) || I == document) {
                    D.containerOffset = {left: 0, top: 0};
                    D.containerPosition = {left: 0, top: 0};
                    D.parentData = {
                        element: C(document),
                        left: 0,
                        top: 0,
                        width: C(document).width(),
                        height: C(document).height() || document.body.parentNode.scrollHeight
                    }
                } else {
                    var H = C(J), E = [];
                    C(["Top", "Right", "Left", "Bottom"]).each(function (K, L) {
                        E[K] = A(H.css("padding" + L))
                    });
                    D.containerOffset = H.offset();
                    D.containerPosition = H.position();
                    D.containerSize = {height: H.innerHeight() - E[3], width: H.innerWidth() - E[1]};
                    I = D.containerOffset;
                    var F = D.containerSize.height, G = D.containerSize.width;
                    G = C.ui.hasScroll(J, "left") ? J.scrollWidth : G;
                    F = C.ui.hasScroll(J) ? J.scrollHeight : F;
                    D.parentData = {element: J, left: I.left, top: I.top, width: G, height: F}
                }
            }
        }, resize: function (D) {
            var J = C(this).data("resizable"), I = J.options, H = J.containerOffset, E = J.position;
            D = J._aspectRatio || D.shiftKey;
            var F = {top: 0, left: 0}, G = J.containerElement;
            if (G[0] != document && /static/.test(G.css("position"))) {
                F = H
            }
            if (E.left < (J._helper ? H.left : 0)) {
                J.size.width += J._helper ? J.position.left - H.left : J.position.left - F.left;
                if (D) {
                    J.size.height = J.size.width / I.aspectRatio
                }
                J.position.left = I.helper ? H.left : 0
            }
            if (E.top < (J._helper ? H.top : 0)) {
                J.size.height += J._helper ? J.position.top - H.top : J.position.top;
                if (D) {
                    J.size.width = J.size.height * I.aspectRatio
                }
                J.position.top = J._helper ? H.top : 0
            }
            J.offset.left = J.parentData.left + J.position.left;
            J.offset.top = J.parentData.top + J.position.top;
            I = Math.abs((J._helper ? J.offset.left - F.left : J.offset.left - F.left) + J.sizeDiff.width);
            H = Math.abs((J._helper ? J.offset.top - F.top : J.offset.top - H.top) + J.sizeDiff.height);
            E = J.containerElement.get(0) == J.element.parent().get(0);
            F = /relative|absolute/.test(J.containerElement.css("position"));
            if (E && F) {
                I -= J.parentData.left
            }
            if (I + J.size.width >= J.parentData.width) {
                J.size.width = J.parentData.width - I;
                if (D) {
                    J.size.height = J.size.width / J.aspectRatio
                }
            }
            if (H + J.size.height >= J.parentData.height) {
                J.size.height = J.parentData.height - H;
                if (D) {
                    J.size.width = J.size.height * J.aspectRatio
                }
            }
        }, stop: function () {
            var K = C(this).data("resizable"), J = K.options, I = K.containerOffset, H = K.containerPosition, E = K.containerElement, F = C(K.helper), D = F.offset(), G = F.outerWidth() - K.sizeDiff.width;
            F = F.outerHeight() - K.sizeDiff.height;
            K._helper && !J.animate && /relative/.test(E.css("position")) && C(this).css({
                left: D.left - H.left - I.left,
                width: G,
                height: F
            });
            K._helper && !J.animate && /static/.test(E.css("position")) && C(this).css({
                left: D.left - H.left - I.left,
                width: G,
                height: F
            })
        }
    });
    C.ui.plugin.add("resizable", "ghost", {
        start: function () {
            var D = C(this).data("resizable"), F = D.options, E = D.size;
            D.ghost = D.originalElement.clone();
            D.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: E.height,
                width: E.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof F.ghost == "string" ? F.ghost : "");
            D.ghost.appendTo(D.helper)
        }, resize: function () {
            var D = C(this).data("resizable");
            D.ghost && D.ghost.css({position: "relative", height: D.size.height, width: D.size.width})
        }, stop: function () {
            var D = C(this).data("resizable");
            D.ghost && D.helper && D.helper.get(0).removeChild(D.ghost.get(0))
        }
    });
    C.ui.plugin.add("resizable", "grid", {
        resize: function () {
            var D = C(this).data("resizable"), J = D.options, I = D.size, H = D.originalSize, E = D.originalPosition, F = D.axis;
            J.grid = typeof J.grid == "number" ? [J.grid, J.grid] : J.grid;
            var G = Math.round((I.width - H.width) / (J.grid[0] || 1)) * (J.grid[0] || 1);
            J = Math.round((I.height - H.height) / (J.grid[1] || 1)) * (J.grid[1] || 1);
            if (/^(se|s|e)$/.test(F)) {
                D.size.width = H.width + G;
                D.size.height = H.height + J
            } else {
                if (/^(ne)$/.test(F)) {
                    D.size.width = H.width + G;
                    D.size.height = H.height + J;
                    D.position.top = E.top - J
                } else {
                    if (/^(sw)$/.test(F)) {
                        D.size.width = H.width + G;
                        D.size.height = H.height + J
                    } else {
                        D.size.width = H.width + G;
                        D.size.height = H.height + J;
                        D.position.top = E.top - J
                    }
                    D.position.left = E.left - G
                }
            }
        }
    });
    var A = function (D) {
        return parseInt(D, 10) || 0
    }, B = function (D) {
        return !isNaN(parseInt(D, 10))
    }
})(jQuery);
(function (A) {
    A.widget("ui.selectable", A.ui.mouse, {
        options: {
            appendTo: "body",
            autoRefresh: true,
            distance: 0,
            filter: "*",
            tolerance: "touch"
        }, _create: function () {
            var B = this;
            this.element.addClass("ui-selectable");
            this.dragged = false;
            var C;
            this.refresh = function () {
                C = A(B.options.filter, B.element[0]);
                C.each(function () {
                    var D = A(this), E = D.offset();
                    A.data(this, "selectable-item", {
                        element: this,
                        $element: D,
                        left: E.left,
                        top: E.top,
                        right: E.left + D.outerWidth(),
                        bottom: E.top + D.outerHeight(),
                        startselected: false,
                        selected: D.hasClass("ui-selected"),
                        selecting: D.hasClass("ui-selecting"),
                        unselecting: D.hasClass("ui-unselecting")
                    })
                })
            };
            this.refresh();
            this.selectees = C.addClass("ui-selectee");
            this._mouseInit();
            this.helper = A("<div class='ui-selectable-helper'></div>")
        }, destroy: function () {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item");
            this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");
            this._mouseDestroy();
            return this
        }, _mouseStart: function (C) {
            var D = this;
            this.opos = [C.pageX, C.pageY];
            if (!this.options.disabled) {
                var B = this.options;
                this.selectees = A(B.filter, this.element[0]);
                this._trigger("start", C);
                A(B.appendTo).append(this.helper);
                this.helper.css({left: C.clientX, top: C.clientY, width: 0, height: 0});
                B.autoRefresh && this.refresh();
                this.selectees.filter(".ui-selected").each(function () {
                    var E = A.data(this, "selectable-item");
                    E.startselected = true;
                    if (!C.metaKey) {
                        E.$element.removeClass("ui-selected");
                        E.selected = false;
                        E.$element.addClass("ui-unselecting");
                        E.unselecting = true;
                        D._trigger("unselecting", C, {unselecting: E.element})
                    }
                });
                A(C.target).parents().andSelf().each(function () {
                    var F = A.data(this, "selectable-item");
                    if (F) {
                        var E = !C.metaKey || !F.$element.hasClass("ui-selected");
                        F.$element.removeClass(E ? "ui-unselecting" : "ui-selected").addClass(E ? "ui-selecting" : "ui-unselecting");
                        F.unselecting = !E;
                        F.selecting = E;
                        (F.selected = E) ? D._trigger("selecting", C, {selecting: F.element}) : D._trigger("unselecting", C, {unselecting: F.element});
                        return false
                    }
                })
            }
        }, _mouseDrag: function (I) {
            var B = this;
            this.dragged = true;
            if (!this.options.disabled) {
                var H = this.options, G = this.opos[0], F = this.opos[1], E = I.pageX, C = I.pageY;
                if (G > E) {
                    var D = E;
                    E = G;
                    G = D
                }
                if (F > C) {
                    D = C;
                    C = F;
                    F = D
                }
                this.helper.css({left: G, top: F, width: E - G, height: C - F});
                this.selectees.each(function () {
                    var K = A.data(this, "selectable-item");
                    if (!(!K || K.element == B.element[0])) {
                        var J = false;
                        if (H.tolerance == "touch") {
                            J = !(K.left > E || K.right < G || K.top > C || K.bottom < F)
                        } else {
                            if (H.tolerance == "fit") {
                                J = K.left > G && K.right < E && K.top > F && K.bottom < C
                            }
                        }
                        if (J) {
                            if (K.selected) {
                                K.$element.removeClass("ui-selected");
                                K.selected = false
                            }
                            if (K.unselecting) {
                                K.$element.removeClass("ui-unselecting");
                                K.unselecting = false
                            }
                            if (!K.selecting) {
                                K.$element.addClass("ui-selecting");
                                K.selecting = true;
                                B._trigger("selecting", I, {selecting: K.element})
                            }
                        } else {
                            if (K.selecting) {
                                if (I.metaKey && K.startselected) {
                                    K.$element.removeClass("ui-selecting");
                                    K.selecting = false;
                                    K.$element.addClass("ui-selected");
                                    K.selected = true
                                } else {
                                    K.$element.removeClass("ui-selecting");
                                    K.selecting = false;
                                    if (K.startselected) {
                                        K.$element.addClass("ui-unselecting");
                                        K.unselecting = true
                                    }
                                    B._trigger("unselecting", I, {unselecting: K.element})
                                }
                            }
                            if (K.selected) {
                                if (!I.metaKey && !K.startselected) {
                                    K.$element.removeClass("ui-selected");
                                    K.selected = false;
                                    K.$element.addClass("ui-unselecting");
                                    K.unselecting = true;
                                    B._trigger("unselecting", I, {unselecting: K.element})
                                }
                            }
                        }
                    }
                });
                return false
            }
        }, _mouseStop: function (B) {
            var C = this;
            this.dragged = false;
            A(".ui-unselecting", this.element[0]).each(function () {
                var D = A.data(this, "selectable-item");
                D.$element.removeClass("ui-unselecting");
                D.unselecting = false;
                D.startselected = false;
                C._trigger("unselected", B, {unselected: D.element})
            });
            A(".ui-selecting", this.element[0]).each(function () {
                var D = A.data(this, "selectable-item");
                D.$element.removeClass("ui-selecting").addClass("ui-selected");
                D.selecting = false;
                D.selected = true;
                D.startselected = true;
                C._trigger("selected", B, {selected: D.element})
            });
            this._trigger("stop", B);
            this.helper.remove();
            return false
        }
    });
    A.extend(A.ui.selectable, {version: "1.8.11"})
})(jQuery);
(function (A) {
    A.widget("ui.sortable", A.ui.mouse, {
        widgetEventPrefix: "sort",
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1000
        },
        _create: function () {
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : false;
            this.offset = this.element.offset();
            this._mouseInit()
        },
        destroy: function () {
            this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
            this._mouseDestroy();
            for (var B = this.items.length - 1; B >= 0; B--) {
                this.items[B].item.removeData("sortable-item")
            }
            return this
        },
        _setOption: function (B, C) {
            if (B === "disabled") {
                this.options[B] = C;
                this.widget()[C ? "addClass" : "removeClass"]("ui-sortable-disabled")
            } else {
                A.Widget.prototype._setOption.apply(this, arguments)
            }
        },
        _mouseCapture: function (C, D) {
            if (this.reverting) {
                return false
            }
            if (this.options.disabled || this.options.type == "static") {
                return false
            }
            this._refreshItems(C);
            var B = null, F = this;
            A(C.target).parents().each(function () {
                if (A.data(this, "sortable-item") == F) {
                    B = A(this);
                    return false
                }
            });
            if (A.data(C.target, "sortable-item") == F) {
                B = A(C.target)
            }
            if (!B) {
                return false
            }
            if (this.options.handle && !D) {
                var E = false;
                A(this.options.handle, B).find("*").andSelf().each(function () {
                    if (this == C.target) {
                        E = true
                    }
                });
                if (!E) {
                    return false
                }
            }
            this.currentItem = B;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart: function (C, D, B) {
            D = this.options;
            var E = this;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(C);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left};
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            A.extend(this.offset, {
                click: {left: C.pageX - this.offset.left, top: C.pageY - this.offset.top},
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this._generatePosition(C);
            this.originalPageX = C.pageX;
            this.originalPageY = C.pageY;
            D.cursorAt && this._adjustOffsetFromHelper(D.cursorAt);
            this.domPosition = {prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0]};
            this.helper[0] != this.currentItem[0] && this.currentItem.hide();
            this._createPlaceholder();
            D.containment && this._setContainment();
            if (D.cursor) {
                if (A("body").css("cursor")) {
                    this._storedCursor = A("body").css("cursor")
                }
                A("body").css("cursor", D.cursor)
            }
            if (D.opacity) {
                if (this.helper.css("opacity")) {
                    this._storedOpacity = this.helper.css("opacity")
                }
                this.helper.css("opacity", D.opacity)
            }
            if (D.zIndex) {
                if (this.helper.css("zIndex")) {
                    this._storedZIndex = this.helper.css("zIndex")
                }
                this.helper.css("zIndex", D.zIndex)
            }
            if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                this.overflowOffset = this.scrollParent.offset()
            }
            this._trigger("start", C, this._uiHash());
            this._preserveHelperProportions || this._cacheHelperProportions();
            if (!B) {
                for (B = this.containers.length - 1; B >= 0; B--) {
                    this.containers[B]._trigger("activate", C, E._uiHash(this))
                }
            }
            if (A.ui.ddmanager) {
                A.ui.ddmanager.current = this
            }
            A.ui.ddmanager && !D.dropBehaviour && A.ui.ddmanager.prepareOffsets(this, C);
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(C);
            return true
        },
        _mouseDrag: function (C) {
            this.position = this._generatePosition(C);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) {
                this.lastPositionAbs = this.positionAbs
            }
            if (this.options.scroll) {
                var D = this.options, B = false;
                if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                    if (this.overflowOffset.top + this.scrollParent[0].offsetHeight - C.pageY < D.scrollSensitivity) {
                        this.scrollParent[0].scrollTop = B = this.scrollParent[0].scrollTop + D.scrollSpeed
                    } else {
                        if (C.pageY - this.overflowOffset.top < D.scrollSensitivity) {
                            this.scrollParent[0].scrollTop = B = this.scrollParent[0].scrollTop - D.scrollSpeed
                        }
                    }
                    if (this.overflowOffset.left + this.scrollParent[0].offsetWidth - C.pageX < D.scrollSensitivity) {
                        this.scrollParent[0].scrollLeft = B = this.scrollParent[0].scrollLeft + D.scrollSpeed
                    } else {
                        if (C.pageX - this.overflowOffset.left < D.scrollSensitivity) {
                            this.scrollParent[0].scrollLeft = B = this.scrollParent[0].scrollLeft - D.scrollSpeed
                        }
                    }
                } else {
                    if (C.pageY - A(document).scrollTop() < D.scrollSensitivity) {
                        B = A(document).scrollTop(A(document).scrollTop() - D.scrollSpeed)
                    } else {
                        if (A(window).height() - (C.pageY - A(document).scrollTop()) < D.scrollSensitivity) {
                            B = A(document).scrollTop(A(document).scrollTop() + D.scrollSpeed)
                        }
                    }
                    if (C.pageX - A(document).scrollLeft() < D.scrollSensitivity) {
                        B = A(document).scrollLeft(A(document).scrollLeft() - D.scrollSpeed)
                    } else {
                        if (A(window).width() - (C.pageX - A(document).scrollLeft()) < D.scrollSensitivity) {
                            B = A(document).scrollLeft(A(document).scrollLeft() + D.scrollSpeed)
                        }
                    }
                }
                B !== false && A.ui.ddmanager && !D.dropBehaviour && A.ui.ddmanager.prepareOffsets(this, C)
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis != "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            for (D = this.items.length - 1; D >= 0; D--) {
                B = this.items[D];
                var F = B.item[0], E = this._intersectsWithPointer(B);
                if (E) {
                    if (F != this.currentItem[0] && this.placeholder[E == 1 ? "next" : "prev"]()[0] != F && !A.ui.contains(this.placeholder[0], F) && (this.options.type == "semi-dynamic" ? !A.ui.contains(this.element[0], F) : true)) {
                        this.direction = E == 1 ? "down" : "up";
                        if (this.options.tolerance == "pointer" || this._intersectsWithSides(B)) {
                            this._rearrange(C, B)
                        } else {
                            break
                        }
                        this._trigger("change", C, this._uiHash());
                        break
                    }
                }
            }
            this._contactContainers(C);
            A.ui.ddmanager && A.ui.ddmanager.drag(this, C);
            this._trigger("sort", C, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },
        _mouseStop: function (C, D) {
            if (C) {
                A.ui.ddmanager && !this.options.dropBehaviour && A.ui.ddmanager.drop(this, C);
                if (this.options.revert) {
                    var B = this;
                    D = B.placeholder.offset();
                    B.reverting = true;
                    A(this.helper).animate({
                        left: D.left - this.offset.parent.left - B.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                        top: D.top - this.offset.parent.top - B.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                    }, parseInt(this.options.revert, 10) || 500, function () {
                        B._clear(C)
                    })
                } else {
                    this._clear(C, D)
                }
                return false
            }
        },
        cancel: function () {
            var B = this;
            if (this.dragging) {
                this._mouseUp({target: null});
                this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var C = this.containers.length - 1; C >= 0; C--) {
                    this.containers[C]._trigger("deactivate", null, B._uiHash(this));
                    if (this.containers[C].containerCache.over) {
                        this.containers[C]._trigger("out", null, B._uiHash(this));
                        this.containers[C].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder) {
                this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
                this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove();
                A.extend(this, {helper: null, dragging: false, reverting: false, _noFinalSort: null});
                this.domPosition.prev ? A(this.domPosition.prev).after(this.currentItem) : A(this.domPosition.parent).prepend(this.currentItem)
            }
            return this
        },
        serialize: function (C) {
            var D = this._getItemsAsjQuery(C && C.connected), B = [];
            C = C || {};
            A(D).each(function () {
                var E = (A(C.item || this).attr(C.attribute || "id") || "").match(C.expression || /(.+)[-=_](.+)/);
                if (E) {
                    B.push((C.key || E[1] + "[]") + "=" + (C.key && C.expression ? E[1] : E[2]))
                }
            });
            !B.length && C.key && B.push(C.key + "=");
            return B.join("&")
        },
        toArray: function (C) {
            var D = this._getItemsAsjQuery(C && C.connected), B = [];
            C = C || {};
            D.each(function () {
                B.push(A(C.item || this).attr(C.attribute || "id") || "")
            });
            return B
        },
        _intersectsWith: function (L) {
            var B = this.positionAbs.left, K = B + this.helperProportions.width, J = this.positionAbs.top, I = J + this.helperProportions.height, H = L.left, E = H + L.width, F = L.top, D = F + L.height, G = this.offset.click.top, C = this.offset.click.left;
            G = J + G > F && J + G < D && B + C > H && B + C < E;
            return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > L[this.floating ? "width" : "height"] ? G : H < B + this.helperProportions.width / 2 && K - this.helperProportions.width / 2 < E && F < J + this.helperProportions.height / 2 && I - this.helperProportions.height / 2 < D
        },
        _intersectsWithPointer: function (C) {
            var D = A.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, C.top, C.height);
            C = A.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, C.left, C.width);
            D = D && C;
            C = this._getDragVerticalDirection();
            var B = this._getDragHorizontalDirection();
            if (!D) {
                return false
            }
            return this.floating ? B && B == "right" || C == "down" ? 2 : 1 : C && (C == "down" ? 2 : 1)
        },
        _intersectsWithSides: function (C) {
            var D = A.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, C.top + C.height / 2, C.height);
            C = A.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, C.left + C.width / 2, C.width);
            var B = this._getDragVerticalDirection(), E = this._getDragHorizontalDirection();
            return this.floating && E ? E == "right" && C || E == "left" && !C : B && (B == "down" && D || B == "up" && !D)
        },
        _getDragVerticalDirection: function () {
            var B = this.positionAbs.top - this.lastPositionAbs.top;
            return B != 0 && (B > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function () {
            var B = this.positionAbs.left - this.lastPositionAbs.left;
            return B != 0 && (B > 0 ? "right" : "left")
        },
        refresh: function (B) {
            this._refreshItems(B);
            this.refreshPositions();
            return this
        },
        _connectWith: function () {
            var B = this.options;
            return B.connectWith.constructor == String ? [B.connectWith] : B.connectWith
        },
        _getItemsAsjQuery: function (C) {
            var D = [], B = [], H = this._connectWith();
            if (H && C) {
                for (C = H.length - 1; C >= 0; C--) {
                    for (var G = A(H[C]), F = G.length - 1; F >= 0; F--) {
                        var E = A.data(G[F], "sortable");
                        if (E && E != this && !E.options.disabled) {
                            B.push([A.isFunction(E.options.items) ? E.options.items.call(E.element) : A(E.options.items, E.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), E])
                        }
                    }
                }
            }
            B.push([A.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : A(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (C = B.length - 1; C >= 0; C--) {
                B[C][0].each(function () {
                    D.push(this)
                })
            }
            return A(D)
        },
        _removeCurrentsFromItems: function () {
            for (var C = this.currentItem.find(":data(sortable-item)"), D = 0; D < this.items.length; D++) {
                for (var B = 0; B < C.length; B++) {
                    C[B] == this.items[D].item[0] && this.items.splice(D, 1)
                }
            }
        },
        _refreshItems: function (I) {
            this.items = [];
            this.containers = [this];
            var B = this.items, H = [[A.isFunction(this.options.items) ? this.options.items.call(this.element[0], I, {item: this.currentItem}) : A(this.options.items, this.element), this]], G = this._connectWith();
            if (G) {
                for (var F = G.length - 1; F >= 0; F--) {
                    for (var E = A(G[F]), C = E.length - 1; C >= 0; C--) {
                        var D = A.data(E[C], "sortable");
                        if (D && D != this && !D.options.disabled) {
                            H.push([A.isFunction(D.options.items) ? D.options.items.call(D.element[0], I, {item: this.currentItem}) : A(D.options.items, D.element), D]);
                            this.containers.push(D)
                        }
                    }
                }
            }
            for (F = H.length - 1; F >= 0; F--) {
                I = H[F][1];
                G = H[F][0];
                C = 0;
                for (E = G.length; C < E; C++) {
                    D = A(G[C]);
                    D.data("sortable-item", I);
                    B.push({item: D, instance: I, width: 0, height: 0, left: 0, top: 0})
                }
            }
        },
        refreshPositions: function (C) {
            if (this.offsetParent && this.helper) {
                this.offset.parent = this._getParentOffset()
            }
            for (var D = this.items.length - 1; D >= 0; D--) {
                var B = this.items[D], E = this.options.toleranceElement ? A(this.options.toleranceElement, B.item) : B.item;
                if (!C) {
                    B.width = E.outerWidth();
                    B.height = E.outerHeight()
                }
                E = E.offset();
                B.left = E.left;
                B.top = E.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) {
                this.options.custom.refreshContainers.call(this)
            } else {
                for (D = this.containers.length - 1; D >= 0; D--) {
                    E = this.containers[D].element.offset();
                    this.containers[D].containerCache.left = E.left;
                    this.containers[D].containerCache.top = E.top;
                    this.containers[D].containerCache.width = this.containers[D].element.outerWidth();
                    this.containers[D].containerCache.height = this.containers[D].element.outerHeight()
                }
            }
            return this
        },
        _createPlaceholder: function (C) {
            var D = C || this, B = D.options;
            if (!B.placeholder || B.placeholder.constructor == String) {
                var E = B.placeholder;
                B.placeholder = {
                    element: function () {
                        var F = A(document.createElement(D.currentItem[0].nodeName)).addClass(E || D.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        if (!E) {
                            F.style.visibility = "hidden"
                        }
                        return F
                    }, update: function (G, F) {
                        if (!(E && !B.forcePlaceholderSize)) {
                            F.height() || F.height(D.currentItem.innerHeight() - parseInt(D.currentItem.css("paddingTop") || 0, 10) - parseInt(D.currentItem.css("paddingBottom") || 0, 10));
                            F.width() || F.width(D.currentItem.innerWidth() - parseInt(D.currentItem.css("paddingLeft") || 0, 10) - parseInt(D.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
            }
            D.placeholder = A(B.placeholder.element.call(D.element, D.currentItem));
            D.currentItem.after(D.placeholder);
            B.placeholder.update(D, D.placeholder)
        },
        _contactContainers: function (C) {
            for (var D = null, B = null, H = this.containers.length - 1; H >= 0; H--) {
                if (!A.ui.contains(this.currentItem[0], this.containers[H].element[0])) {
                    if (this._intersectsWith(this.containers[H].containerCache)) {
                        if (!(D && A.ui.contains(this.containers[H].element[0], D.element[0]))) {
                            D = this.containers[H];
                            B = H
                        }
                    } else {
                        if (this.containers[H].containerCache.over) {
                            this.containers[H]._trigger("out", C, this._uiHash(this));
                            this.containers[H].containerCache.over = 0
                        }
                    }
                }
            }
            if (D) {
                if (this.containers.length === 1) {
                    this.containers[B]._trigger("over", C, this._uiHash(this));
                    this.containers[B].containerCache.over = 1
                } else {
                    if (this.currentContainer != this.containers[B]) {
                        D = 10000;
                        H = null;
                        for (var G = this.positionAbs[this.containers[B].floating ? "left" : "top"], F = this.items.length - 1; F >= 0; F--) {
                            if (A.ui.contains(this.containers[B].element[0], this.items[F].item[0])) {
                                var E = this.items[F][this.containers[B].floating ? "left" : "top"];
                                if (Math.abs(E - G) < D) {
                                    D = Math.abs(E - G);
                                    H = this.items[F]
                                }
                            }
                        }
                        if (H || this.options.dropOnEmpty) {
                            this.currentContainer = this.containers[B];
                            H ? this._rearrange(C, H, null, true) : this._rearrange(C, null, this.containers[B].element, true);
                            this._trigger("change", C, this._uiHash());
                            this.containers[B]._trigger("change", C, this._uiHash(this));
                            this.options.placeholder.update(this.currentContainer, this.placeholder);
                            this.containers[B]._trigger("over", C, this._uiHash(this));
                            this.containers[B].containerCache.over = 1
                        }
                    }
                }
            }
        },
        _createHelper: function (B) {
            var C = this.options;
            B = A.isFunction(C.helper) ? A(C.helper.apply(this.element[0], [B, this.currentItem])) : C.helper == "clone" ? this.currentItem.clone() : this.currentItem;
            B.parents("body").length || A(C.appendTo != "parent" ? C.appendTo : this.currentItem[0].parentNode)[0].appendChild(B[0]);
            if (B[0] == this.currentItem[0]) {
                this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }
            }
            if (B[0].style.width == "" || C.forceHelperSize) {
                B.width(this.currentItem.width())
            }
            if (B[0].style.height == "" || C.forceHelperSize) {
                B.height(this.currentItem.height())
            }
            return B
        },
        _adjustOffsetFromHelper: function (B) {
            if (typeof B == "string") {
                B = B.split(" ")
            }
            if (A.isArray(B)) {
                B = {left: +B[0], top: +B[1] || 0}
            }
            if ("left" in B) {
                this.offset.click.left = B.left + this.margins.left
            }
            if ("right" in B) {
                this.offset.click.left = this.helperProportions.width - B.right + this.margins.left
            }
            if ("top" in B) {
                this.offset.click.top = B.top + this.margins.top
            }
            if ("bottom" in B) {
                this.offset.click.top = this.helperProportions.height - B.bottom + this.margins.top
            }
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var B = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && A.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                B.left += this.scrollParent.scrollLeft();
                B.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && A.browser.msie) {
                B = {top: 0, left: 0}
            }
            return {
                top: B.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: B.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var B = this.currentItem.position();
                return {
                    top: B.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: B.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {top: 0, left: 0}
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
        },
        _setContainment: function () {
            var C = this.options;
            if (C.containment == "parent") {
                C.containment = this.helper[0].parentNode
            }
            if (C.containment == "document" || C.containment == "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, A(C.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (A(C.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!/^(document|window|parent)$/.test(C.containment)) {
                var D = A(C.containment)[0];
                C = A(C.containment).offset();
                var B = A(D).css("overflow") != "hidden";
                this.containment = [C.left + (parseInt(A(D).css("borderLeftWidth"), 10) || 0) + (parseInt(A(D).css("paddingLeft"), 10) || 0) - this.margins.left, C.top + (parseInt(A(D).css("borderTopWidth"), 10) || 0) + (parseInt(A(D).css("paddingTop"), 10) || 0) - this.margins.top, C.left + (B ? Math.max(D.scrollWidth, D.offsetWidth) : D.offsetWidth) - (parseInt(A(D).css("borderLeftWidth"), 10) || 0) - (parseInt(A(D).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, C.top + (B ? Math.max(D.scrollHeight, D.offsetHeight) : D.offsetHeight) - (parseInt(A(D).css("borderTopWidth"), 10) || 0) - (parseInt(A(D).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function (C, D) {
            if (!D) {
                D = this.position
            }
            C = C == "absolute" ? 1 : -1;
            var B = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && A.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, E = /(html|body)/i.test(B[0].tagName);
            return {
                top: D.top + this.offset.relative.top * C + this.offset.parent.top * C - (A.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : E ? 0 : B.scrollTop()) * C),
                left: D.left + this.offset.relative.left * C + this.offset.parent.left * C - (A.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : E ? 0 : B.scrollLeft()) * C)
            }
        },
        _generatePosition: function (C) {
            var D = this.options, B = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && A.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent, G = /(html|body)/i.test(B[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
                this.offset.relative = this._getRelativeOffset()
            }
            var F = C.pageX, E = C.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (C.pageX - this.offset.click.left < this.containment[0]) {
                        F = this.containment[0] + this.offset.click.left
                    }
                    if (C.pageY - this.offset.click.top < this.containment[1]) {
                        E = this.containment[1] + this.offset.click.top
                    }
                    if (C.pageX - this.offset.click.left > this.containment[2]) {
                        F = this.containment[2] + this.offset.click.left
                    }
                    if (C.pageY - this.offset.click.top > this.containment[3]) {
                        E = this.containment[3] + this.offset.click.top
                    }
                }
                if (D.grid) {
                    E = this.originalPageY + Math.round((E - this.originalPageY) / D.grid[1]) * D.grid[1];
                    E = this.containment ? !(E - this.offset.click.top < this.containment[1] || E - this.offset.click.top > this.containment[3]) ? E : !(E - this.offset.click.top < this.containment[1]) ? E - D.grid[1] : E + D.grid[1] : E;
                    F = this.originalPageX + Math.round((F - this.originalPageX) / D.grid[0]) * D.grid[0];
                    F = this.containment ? !(F - this.offset.click.left < this.containment[0] || F - this.offset.click.left > this.containment[2]) ? F : !(F - this.offset.click.left < this.containment[0]) ? F - D.grid[0] : F + D.grid[0] : F
                }
            }
            return {
                top: E - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (A.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : G ? 0 : B.scrollTop()),
                left: F - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (A.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : G ? 0 : B.scrollLeft())
            }
        },
        _rearrange: function (C, D, B, G) {
            B ? B[0].appendChild(this.placeholder[0]) : D.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? D.item[0] : D.item[0].nextSibling);
            this.counter = this.counter ? ++this.counter : 1;
            var F = this, E = this.counter;
            window.setTimeout(function () {
                E == F.counter && F.refreshPositions(!G)
            }, 0)
        },
        _clear: function (C, D) {
            this.reverting = false;
            var B = [];
            !this._noFinalSort && this.currentItem[0].parentNode && this.placeholder.before(this.currentItem);
            this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var E in this._storedCSS) {
                    if (this._storedCSS[E] == "auto" || this._storedCSS[E] == "static") {
                        this._storedCSS[E] = ""
                    }
                }
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else {
                this.currentItem.show()
            }
            this.fromOutside && !D && B.push(function (F) {
                this._trigger("receive", F, this._uiHash(this.fromOutside))
            });
            if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !D) {
                B.push(function (F) {
                    this._trigger("update", F, this._uiHash())
                })
            }
            if (!A.ui.contains(this.element[0], this.currentItem[0])) {
                D || B.push(function (F) {
                    this._trigger("remove", F, this._uiHash())
                });
                for (E = this.containers.length - 1; E >= 0; E--) {
                    if (A.ui.contains(this.containers[E].element[0], this.currentItem[0]) && !D) {
                        B.push(function (F) {
                            return function (G) {
                                F._trigger("receive", G, this._uiHash(this))
                            }
                        }.call(this, this.containers[E]));
                        B.push(function (F) {
                            return function (G) {
                                F._trigger("update", G, this._uiHash(this))
                            }
                        }.call(this, this.containers[E]))
                    }
                }
            }
            for (E = this.containers.length - 1; E >= 0; E--) {
                D || B.push(function (F) {
                    return function (G) {
                        F._trigger("deactivate", G, this._uiHash(this))
                    }
                }.call(this, this.containers[E]));
                if (this.containers[E].containerCache.over) {
                    B.push(function (F) {
                        return function (G) {
                            F._trigger("out", G, this._uiHash(this))
                        }
                    }.call(this, this.containers[E]));
                    this.containers[E].containerCache.over = 0
                }
            }
            this._storedCursor && A("body").css("cursor", this._storedCursor);
            this._storedOpacity && this.helper.css("opacity", this._storedOpacity);
            if (this._storedZIndex) {
                this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex)
            }
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!D) {
                    this._trigger("beforeStop", C, this._uiHash());
                    for (E = 0; E < B.length; E++) {
                        B[E].call(this, C)
                    }
                    this._trigger("stop", C, this._uiHash())
                }
                return false
            }
            D || this._trigger("beforeStop", C, this._uiHash());
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            this.helper[0] != this.currentItem[0] && this.helper.remove();
            this.helper = null;
            if (!D) {
                for (E = 0; E < B.length; E++) {
                    B[E].call(this, C)
                }
                this._trigger("stop", C, this._uiHash())
            }
            this.fromOutside = false;
            return true
        },
        _trigger: function () {
            A.Widget.prototype._trigger.apply(this, arguments) === false && this.cancel()
        },
        _uiHash: function (B) {
            var C = B || this;
            return {
                helper: C.helper,
                placeholder: C.placeholder || A([]),
                position: C.position,
                originalPosition: C.originalPosition,
                offset: C.positionAbs,
                item: C.currentItem,
                sender: B ? B.element : null
            }
        }
    });
    A.extend(A.ui.sortable, {version: "1.8.11"})
})(jQuery);
jQuery.effects || function (G, L) {
    function A(M) {
        var N;
        if (M && M.constructor == Array && M.length == 3) {
            return M
        }
        if (N = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(M)) {
            return [parseInt(N[1], 10), parseInt(N[2], 10), parseInt(N[3], 10)]
        }
        if (N = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(M)) {
            return [parseFloat(N[1]) * 2.55, parseFloat(N[2]) * 2.55, parseFloat(N[3]) * 2.55]
        }
        if (N = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(M)) {
            return [parseInt(N[1], 16), parseInt(N[2], 16), parseInt(N[3], 16)]
        }
        if (N = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(M)) {
            return [parseInt(N[1] + N[1], 16), parseInt(N[2] + N[2], 16), parseInt(N[3] + N[3], 16)]
        }
        if (/rgba\(0, 0, 0, 0\)/.exec(M)) {
            return C.transparent
        }
        return C[G.trim(M).toLowerCase()]
    }

    function K(M, O) {
        var N;
        do {
            N = G.curCSS(M, O);
            if (N != "" && N != "transparent" || G.nodeName(M, "body")) {
                break
            }
            O = "backgroundColor"
        } while (M = M.parentNode);
        return A(N)
    }

    function J() {
        var N = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle, Q = {}, O, M;
        if (N && N.length && N[0] && N[N[0]]) {
            for (var P = N.length; P--;) {
                O = N[P];
                if (typeof N[O] == "string") {
                    M = O.replace(/\-(\w)/g, function (S, R) {
                        return R.toUpperCase()
                    });
                    Q[M] = N[O]
                }
            }
        } else {
            for (O in N) {
                if (typeof N[O] === "string") {
                    Q[O] = N[O]
                }
            }
        }
        return Q
    }

    function I(M) {
        var O, N;
        for (O in M) {
            N = M[O];
            if (N == null || G.isFunction(N) || O in B || /scrollbar/.test(O) || !/color/i.test(O) && isNaN(parseFloat(N))) {
                delete M[O]
            }
        }
        return M
    }

    function H(N, P) {
        var O = {_: 0}, M;
        for (M in P) {
            if (N[M] != P[M]) {
                O[M] = P[M]
            }
        }
        return O
    }

    function D(N, P, O, M) {
        if (typeof N == "object") {
            M = P;
            O = null;
            P = N;
            N = P.effect
        }
        if (G.isFunction(P)) {
            M = P;
            O = null;
            P = {}
        }
        if (typeof P == "number" || G.fx.speeds[P]) {
            M = O;
            O = P;
            P = {}
        }
        if (G.isFunction(O)) {
            M = O;
            O = null
        }
        P = P || {};
        O = O || P.duration;
        O = G.fx.off ? 0 : typeof O == "number" ? O : O in G.fx.speeds ? G.fx.speeds[O] : G.fx.speeds._default;
        M = M || P.complete;
        return [N, P, O, M]
    }

    function E(M) {
        if (!M || typeof M === "number" || G.fx.speeds[M]) {
            return true
        }
        if (typeof M === "string" && !G.effects[M]) {
            return true
        }
        return false
    }

    G.effects = {};
    G.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"], function (M, N) {
        G.fx.step[N] = function (O) {
            if (!O.colorInit) {
                O.start = K(O.elem, N);
                O.end = A(O.end);
                O.colorInit = true
            }
            O.elem.style[N] = "rgb(" + Math.max(Math.min(parseInt(O.pos * (O.end[0] - O.start[0]) + O.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(O.pos * (O.end[1] - O.start[1]) + O.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(O.pos * (O.end[2] - O.start[2]) + O.start[2], 10), 255), 0) + ")"
        }
    });
    var C = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    }, F = ["add", "remove", "toggle"], B = {
        border: 1,
        borderBottom: 1,
        borderColor: 1,
        borderLeft: 1,
        borderRight: 1,
        borderTop: 1,
        borderWidth: 1,
        margin: 1,
        padding: 1
    };
    G.effects.animateClass = function (N, P, O, M) {
        if (G.isFunction(O)) {
            M = O;
            O = null
        }
        return this.queue("fx", function () {
            var S = G(this), R = S.attr("style") || " ", Q = I(J.call(this)), U, T = S.attr("className");
            G.each(F, function (V, W) {
                N[W] && S[W + "Class"](N[W])
            });
            U = I(J.call(this));
            S.attr("className", T);
            S.animate(H(Q, U), P, O, function () {
                G.each(F, function (V, W) {
                    N[W] && S[W + "Class"](N[W])
                });
                if (typeof S.attr("style") == "object") {
                    S.attr("style").cssText = "";
                    S.attr("style").cssText = R
                } else {
                    S.attr("style", R)
                }
                M && M.apply(this, arguments)
            });
            Q = G.queue(this);
            U = Q.splice(Q.length - 1, 1)[0];
            Q.splice(1, 0, U);
            G.dequeue(this)
        })
    };
    G.fn.extend({
        _addClass: G.fn.addClass, addClass: function (N, P, O, M) {
            return P ? G.effects.animateClass.apply(this, [{add: N}, P, O, M]) : this._addClass(N)
        }, _removeClass: G.fn.removeClass, removeClass: function (N, P, O, M) {
            return P ? G.effects.animateClass.apply(this, [{remove: N}, P, O, M]) : this._removeClass(N)
        }, _toggleClass: G.fn.toggleClass, toggleClass: function (N, Q, O, M, P) {
            return typeof Q == "boolean" || Q === L ? O ? G.effects.animateClass.apply(this, [Q ? {add: N} : {remove: N}, O, M, P]) : this._toggleClass(N, Q) : G.effects.animateClass.apply(this, [{toggle: N}, Q, O, M])
        }, switchClass: function (N, Q, O, M, P) {
            return G.effects.animateClass.apply(this, [{add: Q, remove: N}, O, M, P])
        }
    });
    G.extend(G.effects, {
        version: "1.8.11", save: function (M, O) {
            for (var N = 0; N < O.length; N++) {
                O[N] !== null && M.data("ec.storage." + O[N], M[0].style[O[N]])
            }
        }, restore: function (M, O) {
            for (var N = 0; N < O.length; N++) {
                O[N] !== null && M.css(O[N], M.data("ec.storage." + O[N]))
            }
        }, setMode: function (M, N) {
            if (N == "toggle") {
                N = M.is(":hidden") ? "show" : "hide"
            }
            return N
        }, getBaseline: function (M, O) {
            var N;
            switch (M[0]) {
                case"top":
                    N = 0;
                    break;
                case"middle":
                    N = 0.5;
                    break;
                case"bottom":
                    N = 1;
                    break;
                default:
                    N = M[0] / O.height
            }
            switch (M[1]) {
                case"left":
                    M = 0;
                    break;
                case"center":
                    M = 0.5;
                    break;
                case"right":
                    M = 1;
                    break;
                default:
                    M = M[1] / O.width
            }
            return {x: M, y: N}
        }, createWrapper: function (M) {
            if (M.parent().is(".ui-effects-wrapper")) {
                return M.parent()
            }
            var O = {
                width: M.outerWidth(true),
                height: M.outerHeight(true),
                "float": M.css("float")
            }, N = G("<div></div>").addClass("ui-effects-wrapper").css({
                fontSize: "100%",
                background: "transparent",
                border: "none",
                margin: 0,
                padding: 0
            });
            M.wrap(N);
            N = M.parent();
            if (M.css("position") == "static") {
                N.css({position: "relative"});
                M.css({position: "relative"})
            } else {
                G.extend(O, {position: M.css("position"), zIndex: M.css("z-index")});
                G.each(["top", "left", "bottom", "right"], function (P, Q) {
                    O[Q] = M.css(Q);
                    if (isNaN(parseInt(O[Q], 10))) {
                        O[Q] = "auto"
                    }
                });
                M.css({position: "relative", top: 0, left: 0, right: "auto", bottom: "auto"})
            }
            return N.css(O).show()
        }, removeWrapper: function (M) {
            if (M.parent().is(".ui-effects-wrapper")) {
                return M.parent().replaceWith(M)
            }
            return M
        }, setTransition: function (N, P, O, M) {
            M = M || {};
            G.each(P, function (R, Q) {
                unit = N.cssUnit(Q);
                if (unit[0] > 0) {
                    M[Q] = unit[0] * O + unit[1]
                }
            });
            return M
        }
    });
    G.fn.extend({
        effect: function (N) {
            var P = D.apply(this, arguments), O = {options: P[1], duration: P[2], callback: P[3]};
            P = O.options.mode;
            var M = G.effects[N];
            if (G.fx.off || !M) {
                return P ? this[P](O.duration, O.callback) : this.each(function () {
                    O.callback && O.callback.call(this)
                })
            }
            return M.call(this, O)
        }, _show: G.fn.show, show: function (M) {
            if (E(M)) {
                return this._show.apply(this, arguments)
            } else {
                var N = D.apply(this, arguments);
                N[1].mode = "show";
                return this.effect.apply(this, N)
            }
        }, _hide: G.fn.hide, hide: function (M) {
            if (E(M)) {
                return this._hide.apply(this, arguments)
            } else {
                var N = D.apply(this, arguments);
                N[1].mode = "hide";
                return this.effect.apply(this, N)
            }
        }, __toggle: G.fn.toggle, toggle: function (M) {
            if (E(M) || typeof M === "boolean" || G.isFunction(M)) {
                return this.__toggle.apply(this, arguments)
            } else {
                var N = D.apply(this, arguments);
                N[1].mode = "toggle";
                return this.effect.apply(this, N)
            }
        }, cssUnit: function (M) {
            var O = this.css(M), N = [];
            G.each(["em", "px", "%", "pt"], function (P, Q) {
                if (O.indexOf(Q) > 0) {
                    N = [parseFloat(O), Q]
                }
            });
            return N
        }
    });
    G.easing.jswing = G.easing.swing;
    G.extend(G.easing, {
        def: "easeOutQuad", swing: function (N, Q, O, M, P) {
            return G.easing[G.easing.def](N, Q, O, M, P)
        }, easeInQuad: function (N, Q, O, M, P) {
            return M * (Q /= P) * Q + O
        }, easeOutQuad: function (N, Q, O, M, P) {
            return -M * (Q /= P) * (Q - 2) + O
        }, easeInOutQuad: function (N, Q, O, M, P) {
            if ((Q /= P / 2) < 1) {
                return M / 2 * Q * Q + O
            }
            return -M / 2 * (--Q * (Q - 2) - 1) + O
        }, easeInCubic: function (N, Q, O, M, P) {
            return M * (Q /= P) * Q * Q + O
        }, easeOutCubic: function (N, Q, O, M, P) {
            return M * ((Q = Q / P - 1) * Q * Q + 1) + O
        }, easeInOutCubic: function (N, Q, O, M, P) {
            if ((Q /= P / 2) < 1) {
                return M / 2 * Q * Q * Q + O
            }
            return M / 2 * ((Q -= 2) * Q * Q + 2) + O
        }, easeInQuart: function (N, Q, O, M, P) {
            return M * (Q /= P) * Q * Q * Q + O
        }, easeOutQuart: function (N, Q, O, M, P) {
            return -M * ((Q = Q / P - 1) * Q * Q * Q - 1) + O
        }, easeInOutQuart: function (N, Q, O, M, P) {
            if ((Q /= P / 2) < 1) {
                return M / 2 * Q * Q * Q * Q + O
            }
            return -M / 2 * ((Q -= 2) * Q * Q * Q - 2) + O
        }, easeInQuint: function (N, Q, O, M, P) {
            return M * (Q /= P) * Q * Q * Q * Q + O
        }, easeOutQuint: function (N, Q, O, M, P) {
            return M * ((Q = Q / P - 1) * Q * Q * Q * Q + 1) + O
        }, easeInOutQuint: function (N, Q, O, M, P) {
            if ((Q /= P / 2) < 1) {
                return M / 2 * Q * Q * Q * Q * Q + O
            }
            return M / 2 * ((Q -= 2) * Q * Q * Q * Q + 2) + O
        }, easeInSine: function (N, Q, O, M, P) {
            return -M * Math.cos(Q / P * (Math.PI / 2)) + M + O
        }, easeOutSine: function (N, Q, O, M, P) {
            return M * Math.sin(Q / P * (Math.PI / 2)) + O
        }, easeInOutSine: function (N, Q, O, M, P) {
            return -M / 2 * (Math.cos(Math.PI * Q / P) - 1) + O
        }, easeInExpo: function (N, Q, O, M, P) {
            return Q == 0 ? O : M * Math.pow(2, 10 * (Q / P - 1)) + O
        }, easeOutExpo: function (N, Q, O, M, P) {
            return Q == P ? O + M : M * (-Math.pow(2, -10 * Q / P) + 1) + O
        }, easeInOutExpo: function (N, Q, O, M, P) {
            if (Q == 0) {
                return O
            }
            if (Q == P) {
                return O + M
            }
            if ((Q /= P / 2) < 1) {
                return M / 2 * Math.pow(2, 10 * (Q - 1)) + O
            }
            return M / 2 * (-Math.pow(2, -10 * --Q) + 2) + O
        }, easeInCirc: function (N, Q, O, M, P) {
            return -M * (Math.sqrt(1 - (Q /= P) * Q) - 1) + O
        }, easeOutCirc: function (N, Q, O, M, P) {
            return M * Math.sqrt(1 - (Q = Q / P - 1) * Q) + O
        }, easeInOutCirc: function (N, Q, O, M, P) {
            if ((Q /= P / 2) < 1) {
                return -M / 2 * (Math.sqrt(1 - Q * Q) - 1) + O
            }
            return M / 2 * (Math.sqrt(1 - (Q -= 2) * Q) + 1) + O
        }, easeInElastic: function (P, S, Q, O, R) {
            P = 1.70158;
            var N = 0, M = O;
            if (S == 0) {
                return Q
            }
            if ((S /= R) == 1) {
                return Q + O
            }
            N || (N = R * 0.3);
            if (M < Math.abs(O)) {
                M = O;
                P = N / 4
            } else {
                P = N / (2 * Math.PI) * Math.asin(O / M)
            }
            return -(M * Math.pow(2, 10 * (S -= 1)) * Math.sin((S * R - P) * 2 * Math.PI / N)) + Q
        }, easeOutElastic: function (P, S, Q, O, R) {
            P = 1.70158;
            var N = 0, M = O;
            if (S == 0) {
                return Q
            }
            if ((S /= R) == 1) {
                return Q + O
            }
            N || (N = R * 0.3);
            if (M < Math.abs(O)) {
                M = O;
                P = N / 4
            } else {
                P = N / (2 * Math.PI) * Math.asin(O / M)
            }
            return M * Math.pow(2, -10 * S) * Math.sin((S * R - P) * 2 * Math.PI / N) + O + Q
        }, easeInOutElastic: function (P, S, Q, O, R) {
            P = 1.70158;
            var N = 0, M = O;
            if (S == 0) {
                return Q
            }
            if ((S /= R / 2) == 2) {
                return Q + O
            }
            N || (N = R * 0.3 * 1.5);
            if (M < Math.abs(O)) {
                M = O;
                P = N / 4
            } else {
                P = N / (2 * Math.PI) * Math.asin(O / M)
            }
            if (S < 1) {
                return -0.5 * M * Math.pow(2, 10 * (S -= 1)) * Math.sin((S * R - P) * 2 * Math.PI / N) + Q
            }
            return M * Math.pow(2, -10 * (S -= 1)) * Math.sin((S * R - P) * 2 * Math.PI / N) * 0.5 + O + Q
        }, easeInBack: function (O, R, P, N, Q, M) {
            if (M == L) {
                M = 1.70158
            }
            return N * (R /= Q) * R * ((M + 1) * R - M) + P
        }, easeOutBack: function (O, R, P, N, Q, M) {
            if (M == L) {
                M = 1.70158
            }
            return N * ((R = R / Q - 1) * R * ((M + 1) * R + M) + 1) + P
        }, easeInOutBack: function (O, R, P, N, Q, M) {
            if (M == L) {
                M = 1.70158
            }
            if ((R /= Q / 2) < 1) {
                return N / 2 * R * R * (((M *= 1.525) + 1) * R - M) + P
            }
            return N / 2 * ((R -= 2) * R * (((M *= 1.525) + 1) * R + M) + 2) + P
        }, easeInBounce: function (N, Q, O, M, P) {
            return M - G.easing.easeOutBounce(N, P - Q, 0, M, P) + O
        }, easeOutBounce: function (N, Q, O, M, P) {
            return (Q /= P) < 1 / 2.75 ? M * 7.5625 * Q * Q + O : Q < 2 / 2.75 ? M * (7.5625 * (Q -= 1.5 / 2.75) * Q + 0.75) + O : Q < 2.5 / 2.75 ? M * (7.5625 * (Q -= 2.25 / 2.75) * Q + 0.9375) + O : M * (7.5625 * (Q -= 2.625 / 2.75) * Q + 0.984375) + O
        }, easeInOutBounce: function (N, Q, O, M, P) {
            if (Q < P / 2) {
                return G.easing.easeInBounce(N, Q * 2, 0, M, P) * 0.5 + O
            }
            return G.easing.easeOutBounce(N, Q * 2 - P, 0, M, P) * 0.5 + M * 0.5 + O
        }
    })
}(jQuery);
(function (A) {
    A.effects.blind = function (B) {
        return this.queue(function () {
            var E = A(this), C = ["position", "top", "bottom", "left", "right"], I = A.effects.setMode(E, B.options.mode || "hide"), H = B.options.direction || "vertical";
            A.effects.save(E, C);
            E.show();
            var G = A.effects.createWrapper(E).css({overflow: "hidden"}), D = H == "vertical" ? "height" : "width";
            H = H == "vertical" ? G.height() : G.width();
            I == "show" && G.css(D, 0);
            var F = {};
            F[D] = I == "show" ? H : 0;
            G.animate(F, B.duration, B.options.easing, function () {
                I == "hide" && E.hide();
                A.effects.restore(E, C);
                A.effects.removeWrapper(E);
                B.callback && B.callback.apply(E[0], arguments);
                E.dequeue()
            })
        })
    }
})(jQuery);
(function (A) {
    A.effects.bounce = function (B) {
        return this.queue(function () {
            var C = A(this), M = ["position", "top", "bottom", "left", "right"], L = A.effects.setMode(C, B.options.mode || "effect"), K = B.options.direction || "up", J = B.options.distance || 20, F = B.options.times || 5, G = B.duration || 250;
            /show|hide/.test(L) && M.push("opacity");
            A.effects.save(C, M);
            C.show();
            A.effects.createWrapper(C);
            var E = K == "up" || K == "down" ? "top" : "left";
            K = K == "up" || K == "left" ? "pos" : "neg";
            J = B.options.distance || (E == "top" ? C.outerHeight({margin: true}) / 3 : C.outerWidth({margin: true}) / 3);
            if (L == "show") {
                C.css("opacity", 0).css(E, K == "pos" ? -J : J)
            }
            if (L == "hide") {
                J /= F * 2
            }
            L != "hide" && F--;
            if (L == "show") {
                var H = {opacity: 1};
                H[E] = (K == "pos" ? "+=" : "-=") + J;
                C.animate(H, G / 2, B.options.easing);
                J /= 2;
                F--
            }
            for (H = 0; H < F; H++) {
                var D = {}, I = {};
                D[E] = (K == "pos" ? "-=" : "+=") + J;
                I[E] = (K == "pos" ? "+=" : "-=") + J;
                C.animate(D, G / 2, B.options.easing).animate(I, G / 2, B.options.easing);
                J = L == "hide" ? J * 2 : J / 2
            }
            if (L == "hide") {
                H = {opacity: 0};
                H[E] = (K == "pos" ? "-=" : "+=") + J;
                C.animate(H, G / 2, B.options.easing, function () {
                    C.hide();
                    A.effects.restore(C, M);
                    A.effects.removeWrapper(C);
                    B.callback && B.callback.apply(this, arguments)
                })
            } else {
                D = {};
                I = {};
                D[E] = (K == "pos" ? "-=" : "+=") + J;
                I[E] = (K == "pos" ? "+=" : "-=") + J;
                C.animate(D, G / 2, B.options.easing).animate(I, G / 2, B.options.easing, function () {
                    A.effects.restore(C, M);
                    A.effects.removeWrapper(C);
                    B.callback && B.callback.apply(this, arguments)
                })
            }
            C.queue("fx", function () {
                C.dequeue()
            });
            C.dequeue()
        })
    }
})(jQuery);
(function (A) {
    A.effects.clip = function (B) {
        return this.queue(function () {
            var E = A(this), C = ["position", "top", "bottom", "left", "right", "height", "width"], I = A.effects.setMode(E, B.options.mode || "hide"), H = B.options.direction || "vertical";
            A.effects.save(E, C);
            E.show();
            var G = A.effects.createWrapper(E).css({overflow: "hidden"});
            G = E[0].tagName == "IMG" ? G : E;
            var D = {size: H == "vertical" ? "height" : "width", position: H == "vertical" ? "top" : "left"};
            H = H == "vertical" ? G.height() : G.width();
            if (I == "show") {
                G.css(D.size, 0);
                G.css(D.position, H / 2)
            }
            var F = {};
            F[D.size] = I == "show" ? H : 0;
            F[D.position] = I == "show" ? 0 : H / 2;
            G.animate(F, {
                queue: false, duration: B.duration, easing: B.options.easing, complete: function () {
                    I == "hide" && E.hide();
                    A.effects.restore(E, C);
                    A.effects.removeWrapper(E);
                    B.callback && B.callback.apply(E[0], arguments);
                    E.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (A) {
    A.effects.drop = function (B) {
        return this.queue(function () {
            var E = A(this), C = ["position", "top", "bottom", "left", "right", "opacity"], I = A.effects.setMode(E, B.options.mode || "hide"), H = B.options.direction || "left";
            A.effects.save(E, C);
            E.show();
            A.effects.createWrapper(E);
            var G = H == "up" || H == "down" ? "top" : "left";
            H = H == "up" || H == "left" ? "pos" : "neg";
            var D = B.options.distance || (G == "top" ? E.outerHeight({margin: true}) / 2 : E.outerWidth({margin: true}) / 2);
            if (I == "show") {
                E.css("opacity", 0).css(G, H == "pos" ? -D : D)
            }
            var F = {opacity: I == "show" ? 1 : 0};
            F[G] = (I == "show" ? H == "pos" ? "+=" : "-=" : H == "pos" ? "-=" : "+=") + D;
            E.animate(F, {
                queue: false, duration: B.duration, easing: B.options.easing, complete: function () {
                    I == "hide" && E.hide();
                    A.effects.restore(E, C);
                    A.effects.removeWrapper(E);
                    B.callback && B.callback.apply(this, arguments);
                    E.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (A) {
    A.effects.explode = function (B) {
        return this.queue(function () {
            var C = B.options.pieces ? Math.round(Math.sqrt(B.options.pieces)) : 3, J = B.options.pieces ? Math.round(Math.sqrt(B.options.pieces)) : 3;
            B.options.mode = B.options.mode == "toggle" ? A(this).is(":visible") ? "hide" : "show" : B.options.mode;
            var I = A(this).show().css("visibility", "hidden"), H = I.offset();
            H.top -= parseInt(I.css("marginTop"), 10) || 0;
            H.left -= parseInt(I.css("marginLeft"), 10) || 0;
            for (var G = I.outerWidth(true), E = I.outerHeight(true), F = 0; F < C; F++) {
                for (var D = 0; D < J; D++) {
                    I.clone().appendTo("body").wrap("<div></div>").css({
                        position: "absolute",
                        visibility: "visible",
                        left: -D * (G / J),
                        top: -F * (E / C)
                    }).parent().addClass("ui-effects-explode").css({
                        position: "absolute",
                        overflow: "hidden",
                        width: G / J,
                        height: E / C,
                        left: H.left + D * (G / J) + (B.options.mode == "show" ? (D - Math.floor(J / 2)) * (G / J) : 0),
                        top: H.top + F * (E / C) + (B.options.mode == "show" ? (F - Math.floor(C / 2)) * (E / C) : 0),
                        opacity: B.options.mode == "show" ? 0 : 1
                    }).animate({
                        left: H.left + D * (G / J) + (B.options.mode == "show" ? 0 : (D - Math.floor(J / 2)) * (G / J)),
                        top: H.top + F * (E / C) + (B.options.mode == "show" ? 0 : (F - Math.floor(C / 2)) * (E / C)),
                        opacity: B.options.mode == "show" ? 1 : 0
                    }, B.duration || 500)
                }
            }
            setTimeout(function () {
                B.options.mode == "show" ? I.css({visibility: "visible"}) : I.css({visibility: "visible"}).hide();
                B.callback && B.callback.apply(I[0]);
                I.dequeue();
                A("div.ui-effects-explode").remove()
            }, B.duration || 500)
        })
    }
})(jQuery);
(function (A) {
    A.effects.fade = function (B) {
        return this.queue(function () {
            var D = A(this), C = A.effects.setMode(D, B.options.mode || "hide");
            D.animate({opacity: C}, {
                queue: false,
                duration: B.duration,
                easing: B.options.easing,
                complete: function () {
                    B.callback && B.callback.apply(this, arguments);
                    D.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (A) {
    A.effects.fold = function (B) {
        return this.queue(function () {
            var C = A(this), L = ["position", "top", "bottom", "left", "right"], K = A.effects.setMode(C, B.options.mode || "hide"), J = B.options.size || 15, I = !!B.options.horizFirst, F = B.duration ? B.duration / 2 : A.fx.speeds._default / 2;
            A.effects.save(C, L);
            C.show();
            var G = A.effects.createWrapper(C).css({overflow: "hidden"}), E = K == "show" != I, H = E ? ["width", "height"] : ["height", "width"];
            E = E ? [G.width(), G.height()] : [G.height(), G.width()];
            var D = /([0-9]+)%/.exec(J);
            if (D) {
                J = parseInt(D[1], 10) / 100 * E[K == "hide" ? 0 : 1]
            }
            if (K == "show") {
                G.css(I ? {height: 0, width: J} : {height: J, width: 0})
            }
            I = {};
            D = {};
            I[H[0]] = K == "show" ? E[0] : J;
            D[H[1]] = K == "show" ? E[1] : 0;
            G.animate(I, F, B.options.easing).animate(D, F, B.options.easing, function () {
                K == "hide" && C.hide();
                A.effects.restore(C, L);
                A.effects.removeWrapper(C);
                B.callback && B.callback.apply(C[0], arguments);
                C.dequeue()
            })
        })
    }
})(jQuery);
(function (A) {
    A.effects.highlight = function (B) {
        return this.queue(function () {
            var D = A(this), C = ["backgroundImage", "backgroundColor", "opacity"], F = A.effects.setMode(D, B.options.mode || "show"), E = {backgroundColor: D.css("backgroundColor")};
            if (F == "hide") {
                E.opacity = 0
            }
            A.effects.save(D, C);
            D.show().css({
                backgroundImage: "none",
                backgroundColor: B.options.color || "#ffff99"
            }).animate(E, {
                queue: false, duration: B.duration, easing: B.options.easing, complete: function () {
                    F == "hide" && D.hide();
                    A.effects.restore(D, C);
                    F == "show" && !A.support.opacity && this.style.removeAttribute("filter");
                    B.callback && B.callback.apply(this, arguments);
                    D.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (A) {
    A.effects.pulsate = function (B) {
        return this.queue(function () {
            var D = A(this), C = A.effects.setMode(D, B.options.mode || "show");
            times = (B.options.times || 5) * 2 - 1;
            duration = B.duration ? B.duration / 2 : A.fx.speeds._default / 2;
            isVisible = D.is(":visible");
            animateTo = 0;
            if (!isVisible) {
                D.css("opacity", 0).show();
                animateTo = 1
            }
            if (C == "hide" && isVisible || C == "show" && !isVisible) {
                times--
            }
            for (C = 0; C < times; C++) {
                D.animate({opacity: animateTo}, duration, B.options.easing);
                animateTo = (animateTo + 1) % 2
            }
            D.animate({opacity: animateTo}, duration, B.options.easing, function () {
                animateTo == 0 && D.hide();
                B.callback && B.callback.apply(this, arguments)
            });
            D.queue("fx", function () {
                D.dequeue()
            }).dequeue()
        })
    }
})(jQuery);
(function (A) {
    A.effects.puff = function (B) {
        return this.queue(function () {
            var D = A(this), C = A.effects.setMode(D, B.options.mode || "hide"), G = parseInt(B.options.percent, 10) || 150, F = G / 100, E = {
                height: D.height(),
                width: D.width()
            };
            A.extend(B.options, {
                fade: true,
                mode: C,
                percent: C == "hide" ? G : 100,
                from: C == "hide" ? E : {height: E.height * F, width: E.width * F}
            });
            D.effect("scale", B.options, B.duration, B.callback);
            D.dequeue()
        })
    };
    A.effects.scale = function (B) {
        return this.queue(function () {
            var E = A(this), C = A.extend(true, {}, B.options), H = A.effects.setMode(E, B.options.mode || "effect"), G = parseInt(B.options.percent, 10) || (parseInt(B.options.percent, 10) == 0 ? 0 : H == "hide" ? 0 : 100), F = B.options.direction || "both", D = B.options.origin;
            if (H != "effect") {
                C.origin = D || ["middle", "center"];
                C.restore = true
            }
            D = {height: E.height(), width: E.width()};
            E.from = B.options.from || (H == "show" ? {height: 0, width: 0} : D);
            G = {y: F != "horizontal" ? G / 100 : 1, x: F != "vertical" ? G / 100 : 1};
            E.to = {height: D.height * G.y, width: D.width * G.x};
            if (B.options.fade) {
                if (H == "show") {
                    E.from.opacity = 0;
                    E.to.opacity = 1
                }
                if (H == "hide") {
                    E.from.opacity = 1;
                    E.to.opacity = 0
                }
            }
            C.from = E.from;
            C.to = E.to;
            C.mode = H;
            E.effect("size", C, B.duration, B.callback);
            E.dequeue()
        })
    };
    A.effects.size = function (B) {
        return this.queue(function () {
            var C = A(this), O = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"], N = ["position", "top", "bottom", "left", "right", "overflow", "opacity"], M = ["width", "height", "overflow"], L = ["fontSize"], G = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"], H = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"], E = A.effects.setMode(C, B.options.mode || "effect"), I = B.options.restore || false, D = B.options.scale || "both", J = B.options.origin, F = {
                height: C.height(),
                width: C.width()
            };
            C.from = B.options.from || F;
            C.to = B.options.to || F;
            if (J) {
                J = A.effects.getBaseline(J, F);
                C.from.top = (F.height - C.from.height) * J.y;
                C.from.left = (F.width - C.from.width) * J.x;
                C.to.top = (F.height - C.to.height) * J.y;
                C.to.left = (F.width - C.to.width) * J.x
            }
            var K = {
                from: {y: C.from.height / F.height, x: C.from.width / F.width},
                to: {y: C.to.height / F.height, x: C.to.width / F.width}
            };
            if (D == "box" || D == "both") {
                if (K.from.y != K.to.y) {
                    O = O.concat(G);
                    C.from = A.effects.setTransition(C, G, K.from.y, C.from);
                    C.to = A.effects.setTransition(C, G, K.to.y, C.to)
                }
                if (K.from.x != K.to.x) {
                    O = O.concat(H);
                    C.from = A.effects.setTransition(C, H, K.from.x, C.from);
                    C.to = A.effects.setTransition(C, H, K.to.x, C.to)
                }
            }
            if (D == "content" || D == "both") {
                if (K.from.y != K.to.y) {
                    O = O.concat(L);
                    C.from = A.effects.setTransition(C, L, K.from.y, C.from);
                    C.to = A.effects.setTransition(C, L, K.to.y, C.to)
                }
            }
            A.effects.save(C, I ? O : N);
            C.show();
            A.effects.createWrapper(C);
            C.css("overflow", "hidden").css(C.from);
            if (D == "content" || D == "both") {
                G = G.concat(["marginTop", "marginBottom"]).concat(L);
                H = H.concat(["marginLeft", "marginRight"]);
                M = O.concat(G).concat(H);
                C.find("*[width]").each(function () {
                    child = A(this);
                    I && A.effects.save(child, M);
                    var P = {height: child.height(), width: child.width()};
                    child.from = {height: P.height * K.from.y, width: P.width * K.from.x};
                    child.to = {height: P.height * K.to.y, width: P.width * K.to.x};
                    if (K.from.y != K.to.y) {
                        child.from = A.effects.setTransition(child, G, K.from.y, child.from);
                        child.to = A.effects.setTransition(child, G, K.to.y, child.to)
                    }
                    if (K.from.x != K.to.x) {
                        child.from = A.effects.setTransition(child, H, K.from.x, child.from);
                        child.to = A.effects.setTransition(child, H, K.to.x, child.to)
                    }
                    child.css(child.from);
                    child.animate(child.to, B.duration, B.options.easing, function () {
                        I && A.effects.restore(child, M)
                    })
                })
            }
            C.animate(C.to, {
                queue: false, duration: B.duration, easing: B.options.easing, complete: function () {
                    C.to.opacity === 0 && C.css("opacity", C.from.opacity);
                    E == "hide" && C.hide();
                    A.effects.restore(C, I ? O : N);
                    A.effects.removeWrapper(C);
                    B.callback && B.callback.apply(this, arguments);
                    C.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (A) {
    A.effects.shake = function (B) {
        return this.queue(function () {
            var C = A(this), L = ["position", "top", "bottom", "left", "right"];
            A.effects.setMode(C, B.options.mode || "effect");
            var K = B.options.direction || "left", J = B.options.distance || 20, I = B.options.times || 3, F = B.duration || B.options.duration || 140;
            A.effects.save(C, L);
            C.show();
            A.effects.createWrapper(C);
            var G = K == "up" || K == "down" ? "top" : "left", E = K == "up" || K == "left" ? "pos" : "neg";
            K = {};
            var H = {}, D = {};
            K[G] = (E == "pos" ? "-=" : "+=") + J;
            H[G] = (E == "pos" ? "+=" : "-=") + J * 2;
            D[G] = (E == "pos" ? "-=" : "+=") + J * 2;
            C.animate(K, F, B.options.easing);
            for (J = 1; J < I; J++) {
                C.animate(H, F, B.options.easing).animate(D, F, B.options.easing)
            }
            C.animate(H, F, B.options.easing).animate(K, F / 2, B.options.easing, function () {
                A.effects.restore(C, L);
                A.effects.removeWrapper(C);
                B.callback && B.callback.apply(this, arguments)
            });
            C.queue("fx", function () {
                C.dequeue()
            });
            C.dequeue()
        })
    }
})(jQuery);
(function (A) {
    A.effects.slide = function (B) {
        return this.queue(function () {
            var E = A(this), C = ["position", "top", "bottom", "left", "right"], I = A.effects.setMode(E, B.options.mode || "show"), H = B.options.direction || "left";
            A.effects.save(E, C);
            E.show();
            A.effects.createWrapper(E).css({overflow: "hidden"});
            var G = H == "up" || H == "down" ? "top" : "left";
            H = H == "up" || H == "left" ? "pos" : "neg";
            var D = B.options.distance || (G == "top" ? E.outerHeight({margin: true}) : E.outerWidth({margin: true}));
            if (I == "show") {
                E.css(G, H == "pos" ? isNaN(D) ? "-" + D : -D : D)
            }
            var F = {};
            F[G] = (I == "show" ? H == "pos" ? "+=" : "-=" : H == "pos" ? "-=" : "+=") + D;
            E.animate(F, {
                queue: false, duration: B.duration, easing: B.options.easing, complete: function () {
                    I == "hide" && E.hide();
                    A.effects.restore(E, C);
                    A.effects.removeWrapper(E);
                    B.callback && B.callback.apply(this, arguments);
                    E.dequeue()
                }
            })
        })
    }
})(jQuery);
(function (A) {
    A.effects.transfer = function (B) {
        return this.queue(function () {
            var D = A(this), C = A(B.options.to), F = C.offset();
            C = {top: F.top, left: F.left, height: C.innerHeight(), width: C.innerWidth()};
            F = D.offset();
            var E = A('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(B.options.className).css({
                top: F.top,
                left: F.left,
                height: D.innerHeight(),
                width: D.innerWidth(),
                position: "absolute"
            }).animate(C, B.duration, B.options.easing, function () {
                E.remove();
                B.callback && B.callback.apply(D[0], arguments);
                D.dequeue()
            })
        })
    }
})(jQuery);
(function (A) {
    A.widget("ui.accordion", {
        options: {
            active: 0,
            animated: "slide",
            autoHeight: true,
            clearStyle: false,
            collapsible: false,
            event: "click",
            fillSpace: false,
            header: "> li > :first-child,> :not(li):even",
            icons: {header: "ui-icon-triangle-1-e", headerSelected: "ui-icon-triangle-1-s"},
            navigation: false,
            navigationFilter: function () {
                return this.href.toLowerCase() === location.href.toLowerCase()
            }
        }, _create: function () {
            var C = this, D = C.options;
            C.running = 0;
            C.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");
            C.headers = C.element.find(D.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function () {
                D.disabled || A(this).addClass("ui-state-hover")
            }).bind("mouseleave.accordion", function () {
                D.disabled || A(this).removeClass("ui-state-hover")
            }).bind("focus.accordion", function () {
                D.disabled || A(this).addClass("ui-state-focus")
            }).bind("blur.accordion", function () {
                D.disabled || A(this).removeClass("ui-state-focus")
            });
            C.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
            if (D.navigation) {
                var B = C.element.find("a").filter(D.navigationFilter).eq(0);
                if (B.length) {
                    var E = B.closest(".ui-accordion-header");
                    C.active = E.length ? E : B.closest(".ui-accordion-content").prev()
                }
            }
            C.active = C._findActive(C.active || D.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
            C.active.next().addClass("ui-accordion-content-active");
            C._createIcons();
            C.resize();
            C.element.attr("role", "tablist");
            C.headers.attr("role", "tab").bind("keydown.accordion", function (F) {
                return C._keydown(F)
            }).next().attr("role", "tabpanel");
            C.headers.not(C.active || "").attr({
                "aria-expanded": "false",
                "aria-selected": "false",
                tabIndex: -1
            }).next().hide();
            C.active.length ? C.active.attr({
                "aria-expanded": "true",
                "aria-selected": "true",
                tabIndex: 0
            }) : C.headers.eq(0).attr("tabIndex", 0);
            A.browser.safari || C.headers.find("a").attr("tabIndex", -1);
            D.event && C.headers.bind(D.event.split(" ").join(".accordion ") + ".accordion", function (F) {
                C._clickHandler.call(C, F, this);
                F.preventDefault()
            })
        }, _createIcons: function () {
            var B = this.options;
            if (B.icons) {
                A("<span></span>").addClass("ui-icon " + B.icons.header).prependTo(this.headers);
                this.active.children(".ui-icon").toggleClass(B.icons.header).toggleClass(B.icons.headerSelected);
                this.element.addClass("ui-accordion-icons")
            }
        }, _destroyIcons: function () {
            this.headers.children(".ui-icon").remove();
            this.element.removeClass("ui-accordion-icons")
        }, destroy: function () {
            var B = this.options;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");
            this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex");
            this.headers.find("a").removeAttr("tabIndex");
            this._destroyIcons();
            var C = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
            if (B.autoHeight || B.fillHeight) {
                C.css("height", "")
            }
            return A.Widget.prototype.destroy.call(this)
        }, _setOption: function (B, C) {
            A.Widget.prototype._setOption.apply(this, arguments);
            B == "active" && this.activate(C);
            if (B == "icons") {
                this._destroyIcons();
                C && this._createIcons()
            }
            if (B == "disabled") {
                this.headers.add(this.headers.next())[C ? "addClass" : "removeClass"]("ui-accordion-disabled ui-state-disabled")
            }
        }, _keydown: function (C) {
            if (!(this.options.disabled || C.altKey || C.ctrlKey)) {
                var D = A.ui.keyCode, B = this.headers.length, F = this.headers.index(C.target), E = false;
                switch (C.keyCode) {
                    case D.RIGHT:
                    case D.DOWN:
                        E = this.headers[(F + 1) % B];
                        break;
                    case D.LEFT:
                    case D.UP:
                        E = this.headers[(F - 1 + B) % B];
                        break;
                    case D.SPACE:
                    case D.ENTER:
                        this._clickHandler({target: C.target}, C.target);
                        C.preventDefault()
                }
                if (E) {
                    A(C.target).attr("tabIndex", -1);
                    A(E).attr("tabIndex", 0);
                    E.focus();
                    return false
                }
                return true
            }
        }, resize: function () {
            var C = this.options, D;
            if (C.fillSpace) {
                if (A.browser.msie) {
                    var B = this.element.parent().css("overflow");
                    this.element.parent().css("overflow", "hidden")
                }
                D = this.element.parent().height();
                A.browser.msie && this.element.parent().css("overflow", B);
                this.headers.each(function () {
                    D -= A(this).outerHeight(true)
                });
                this.headers.next().each(function () {
                    A(this).height(Math.max(0, D - A(this).innerHeight() + A(this).height()))
                }).css("overflow", "auto")
            } else {
                if (C.autoHeight) {
                    D = 0;
                    this.headers.next().each(function () {
                        D = Math.max(D, A(this).height("").height())
                    }).height(D)
                }
            }
            return this
        }, activate: function (B) {
            this.options.active = B;
            B = this._findActive(B)[0];
            this._clickHandler({target: B}, B);
            return this
        }, _findActive: function (B) {
            return B ? typeof B === "number" ? this.headers.filter(":eq(" + B + ")") : this.headers.not(this.headers.not(B)) : B === false ? A([]) : this.headers.filter(":eq(0)")
        }, _clickHandler: function (I, B) {
            var H = this.options;
            if (!H.disabled) {
                if (I.target) {
                    I = A(I.currentTarget || B);
                    B = I[0] === this.active[0];
                    H.active = H.collapsible && B ? false : this.headers.index(I);
                    if (!(this.running || !H.collapsible && B)) {
                        var G = this.active;
                        D = I.next();
                        E = this.active.next();
                        C = {
                            options: H,
                            newHeader: B && H.collapsible ? A([]) : I,
                            oldHeader: this.active,
                            newContent: B && H.collapsible ? A([]) : D,
                            oldContent: E
                        };
                        var F = this.headers.index(this.active[0]) > this.headers.index(I[0]);
                        this.active = B ? A([]) : I;
                        this._toggle(D, E, C, B, F);
                        G.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(H.icons.headerSelected).addClass(H.icons.header);
                        if (!B) {
                            I.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(H.icons.header).addClass(H.icons.headerSelected);
                            I.next().addClass("ui-accordion-content-active")
                        }
                    }
                } else {
                    if (H.collapsible) {
                        this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(H.icons.headerSelected).addClass(H.icons.header);
                        this.active.next().addClass("ui-accordion-content-active");
                        var E = this.active.next(), C = {
                            options: H,
                            newHeader: A([]),
                            oldHeader: H.active,
                            newContent: A([]),
                            oldContent: E
                        }, D = this.active = A([]);
                        this._toggle(D, E, C)
                    }
                }
            }
        }, _toggle: function (K, B, J, I, H) {
            var G = this, D = G.options;
            G.toShow = K;
            G.toHide = B;
            G.data = J;
            var E = function () {
                if (G) {
                    return G._completed.apply(G, arguments)
                }
            };
            G._trigger("changestart", null, G.data);
            G.running = B.size() === 0 ? K.size() : B.size();
            if (D.animated) {
                J = {};
                J = D.collapsible && I ? {
                    toShow: A([]),
                    toHide: B,
                    complete: E,
                    down: H,
                    autoHeight: D.autoHeight || D.fillSpace
                } : {toShow: K, toHide: B, complete: E, down: H, autoHeight: D.autoHeight || D.fillSpace};
                if (!D.proxied) {
                    D.proxied = D.animated
                }
                if (!D.proxiedDuration) {
                    D.proxiedDuration = D.duration
                }
                D.animated = A.isFunction(D.proxied) ? D.proxied(J) : D.proxied;
                D.duration = A.isFunction(D.proxiedDuration) ? D.proxiedDuration(J) : D.proxiedDuration;
                I = A.ui.accordion.animations;
                var C = D.duration, F = D.animated;
                if (F && !I[F] && !A.easing[F]) {
                    F = "slide"
                }
                I[F] || (I[F] = function (L) {
                    this.slide(L, {easing: F, duration: C || 700})
                });
                I[F](J)
            } else {
                if (D.collapsible && I) {
                    K.toggle()
                } else {
                    B.hide();
                    K.show()
                }
                E(true)
            }
            B.prev().attr({"aria-expanded": "false", "aria-selected": "false", tabIndex: -1}).blur();
            K.prev().attr({"aria-expanded": "true", "aria-selected": "true", tabIndex: 0}).focus()
        }, _completed: function (B) {
            this.running = B ? 0 : --this.running;
            if (!this.running) {
                this.options.clearStyle && this.toShow.add(this.toHide).css({height: "", overflow: ""});
                this.toHide.removeClass("ui-accordion-content-active");
                if (this.toHide.length) {
                    this.toHide.parent()[0].className = this.toHide.parent()[0].className
                }
                this._trigger("change", null, this.data)
            }
        }
    });
    A.extend(A.ui.accordion, {
        version: "1.8.11", animations: {
            slide: function (C, D) {
                C = A.extend({easing: "swing", duration: 300}, C, D);
                if (C.toHide.size()) {
                    if (C.toShow.size()) {
                        var B = C.toShow.css("overflow"), H = 0, G = {}, F = {}, E;
                        D = C.toShow;
                        E = D[0].style.width;
                        D.width(parseInt(D.parent().width(), 10) - parseInt(D.css("paddingLeft"), 10) - parseInt(D.css("paddingRight"), 10) - (parseInt(D.css("borderLeftWidth"), 10) || 0) - (parseInt(D.css("borderRightWidth"), 10) || 0));
                        A.each(["height", "paddingTop", "paddingBottom"], function (I, J) {
                            F[J] = "hide";
                            I = ("" + A.css(C.toShow[0], J)).match(/^([\d+-.]+)(.*)$/);
                            G[J] = {value: I[1], unit: I[2] || "px"}
                        });
                        C.toShow.css({height: 0, overflow: "hidden"}).show();
                        C.toHide.filter(":hidden").each(C.complete).end().filter(":visible").animate(F, {
                            step: function (I, J) {
                                if (J.prop == "height") {
                                    H = J.end - J.start === 0 ? 0 : (J.now - J.start) / (J.end - J.start)
                                }
                                C.toShow[0].style[J.prop] = H * G[J.prop].value + G[J.prop].unit
                            }, duration: C.duration, easing: C.easing, complete: function () {
                                C.autoHeight || C.toShow.css("height", "");
                                C.toShow.css({width: E, overflow: B});
                                C.complete()
                            }
                        })
                    } else {
                        C.toHide.animate({height: "hide", paddingTop: "hide", paddingBottom: "hide"}, C)
                    }
                } else {
                    C.toShow.animate({height: "show", paddingTop: "show", paddingBottom: "show"}, C)
                }
            }, bounceslide: function (B) {
                this.slide(B, {easing: B.down ? "easeOutBounce" : "swing", duration: B.down ? 1000 : 200})
            }
        }
    })
})(jQuery);
(function (B) {
    var A = 0;
    B.widget("ui.autocomplete", {
        options: {
            appendTo: "body",
            autoFocus: false,
            delay: 300,
            minLength: 1,
            position: {my: "left top", at: "left bottom", collision: "none"},
            source: null
        }, pending: 0, _create: function () {
            var D = this, C = this.element[0].ownerDocument, E;
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
                role: "textbox",
                "aria-autocomplete": "list",
                "aria-haspopup": "true"
            }).bind("keydown.autocomplete", function (G) {
                if (!(D.options.disabled || D.element.attr("readonly"))) {
                    E = false;
                    var F = B.ui.keyCode;
                    switch (G.keyCode) {
                        case F.PAGE_UP:
                            D._move("previousPage", G);
                            break;
                        case F.PAGE_DOWN:
                            D._move("nextPage", G);
                            break;
                        case F.UP:
                            D._move("previous", G);
                            G.preventDefault();
                            break;
                        case F.DOWN:
                            D._move("next", G);
                            G.preventDefault();
                            break;
                        case F.ENTER:
                        case F.NUMPAD_ENTER:
                            if (D.menu.active) {
                                E = true;
                                G.preventDefault()
                            }
                        case F.TAB:
                            if (!D.menu.active) {
                                return
                            }
                            D.menu.select(G);
                            break;
                        case F.ESCAPE:
                            D.element.val(D.term);
                            D.close(G);
                            break;
                        default:
                            clearTimeout(D.searching);
                            D.searching = setTimeout(function () {
                                if (D.term != D.element.val()) {
                                    D.selectedItem = null;
                                    D.search(null, G)
                                }
                            }, D.options.delay);
                            break
                    }
                }
            }).bind("keypress.autocomplete", function (F) {
                if (E) {
                    E = false;
                    F.preventDefault()
                }
            }).bind("focus.autocomplete", function () {
                if (!D.options.disabled) {
                    D.selectedItem = null;
                    D.previous = D.element.val()
                }
            }).bind("blur.autocomplete", function (F) {
                if (!D.options.disabled) {
                    clearTimeout(D.searching);
                    D.closing = setTimeout(function () {
                        D.close(F);
                        D._change(F)
                    }, 150)
                }
            });
            this._initSource();
            this.response = function () {
                return D._response.apply(D, arguments)
            };
            this.menu = B("<ul></ul>").addClass("ui-autocomplete").appendTo(B(this.options.appendTo || "body", C)[0]).mousedown(function (G) {
                var F = D.menu.element[0];
                B(G.target).closest(".ui-menu-item").length || setTimeout(function () {
                    B(document).one("mousedown", function (H) {
                        H.target !== D.element[0] && H.target !== F && !B.ui.contains(F, H.target) && D.close()
                    })
                }, 1);
                setTimeout(function () {
                    clearTimeout(D.closing)
                }, 13)
            }).menu({
                focus: function (G, F) {
                    F = F.item.data("item.autocomplete");
                    false !== D._trigger("focus", G, {item: F}) && /^key/.test(G.originalEvent.type) && D.element.val(F.value)
                }, selected: function (I, H) {
                    var F = H.item.data("item.autocomplete"), G = D.previous;
                    if (D.element[0] !== C.activeElement) {
                        D.element.focus();
                        D.previous = G;
                        setTimeout(function () {
                            D.previous = G;
                            D.selectedItem = F
                        }, 1)
                    }
                    false !== D._trigger("select", I, {item: F}) && D.element.val(F.value);
                    D.term = D.element.val();
                    D.close(I);
                    D.selectedItem = F
                }, blur: function () {
                    D.menu.element.is(":visible") && D.element.val() !== D.term && D.element.val(D.term)
                }
            }).zIndex(this.element.zIndex() + 1).css({top: 0, left: 0}).hide().data("menu");
            B.fn.bgiframe && this.menu.element.bgiframe()
        }, destroy: function () {
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
            this.menu.element.remove();
            B.Widget.prototype.destroy.call(this)
        }, _setOption: function (D, C) {
            B.Widget.prototype._setOption.apply(this, arguments);
            D === "source" && this._initSource();
            if (D === "appendTo") {
                this.menu.element.appendTo(B(C || "body", this.element[0].ownerDocument)[0])
            }
            D === "disabled" && C && this.xhr && this.xhr.abort()
        }, _initSource: function () {
            var D = this, C, E;
            if (B.isArray(this.options.source)) {
                C = this.options.source;
                this.source = function (G, F) {
                    F(B.ui.autocomplete.filter(C, G.term))
                }
            } else {
                if (typeof this.options.source === "string") {
                    E = this.options.source;
                    this.source = function (G, F) {
                        D.xhr && D.xhr.abort();
                        D.xhr = B.ajax({
                            url: E, data: G, dataType: "json", autocompleteRequest: ++A, success: function (H) {
                                this.autocompleteRequest === A && F(H)
                            }, error: function () {
                                this.autocompleteRequest === A && F([])
                            }
                        })
                    }
                } else {
                    this.source = this.options.source
                }
            }
        }, search: function (D, C) {
            D = D != null ? D : this.element.val();
            this.term = this.element.val();
            if (D.length < this.options.minLength) {
                return this.close(C)
            }
            clearTimeout(this.closing);
            if (this._trigger("search", C) !== false) {
                return this._search(D)
            }
        }, _search: function (C) {
            this.pending++;
            this.element.addClass("ui-autocomplete-loading");
            this.source({term: C}, this.response)
        }, _response: function (C) {
            if (!this.options.disabled && C && C.length) {
                C = this._normalize(C);
                this._suggest(C);
                this._trigger("open")
            } else {
                this.close()
            }
            this.pending--;
            this.pending || this.element.removeClass("ui-autocomplete-loading")
        }, close: function (C) {
            clearTimeout(this.closing);
            if (this.menu.element.is(":visible")) {
                this.menu.element.hide();
                this.menu.deactivate();
                this._trigger("close", C)
            }
        }, _change: function (C) {
            this.previous !== this.element.val() && this._trigger("change", C, {item: this.selectedItem})
        }, _normalize: function (C) {
            if (C.length && C[0].label && C[0].value) {
                return C
            }
            return B.map(C, function (D) {
                if (typeof D === "string") {
                    return {label: D, value: D}
                }
                return B.extend({label: D.label || D.value, value: D.value || D.label}, D)
            })
        }, _suggest: function (D) {
            var C = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
            this._renderMenu(C, D);
            this.menu.deactivate();
            this.menu.refresh();
            C.show();
            this._resizeMenu();
            C.position(B.extend({of: this.element}, this.options.position));
            this.options.autoFocus && this.menu.next(new B.Event("mouseover"))
        }, _resizeMenu: function () {
            var C = this.menu.element;
            C.outerWidth(Math.max(C.width("").outerWidth(), this.element.outerWidth()))
        }, _renderMenu: function (D, C) {
            var E = this;
            B.each(C, function (G, F) {
                E._renderItem(D, F)
            })
        }, _renderItem: function (D, C) {
            return B("<li></li>").data("item.autocomplete", C).append(B("<a></a>").text(C.label)).appendTo(D)
        }, _move: function (D, C) {
            if (this.menu.element.is(":visible")) {
                if (this.menu.first() && /^previous/.test(D) || this.menu.last() && /^next/.test(D)) {
                    this.element.val(this.term);
                    this.menu.deactivate()
                } else {
                    this.menu[D](C)
                }
            } else {
                this.search(null, C)
            }
        }, widget: function () {
            return this.menu.element
        }
    });
    B.extend(B.ui.autocomplete, {
        escapeRegex: function (C) {
            return C.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
        }, filter: function (D, C) {
            var E = new RegExp(B.ui.autocomplete.escapeRegex(C), "i");
            return B.grep(D, function (F) {
                return E.test(F.label || F.value || F)
            })
        }
    })
})(jQuery);
(function (A) {
    A.widget("ui.menu", {
        _create: function () {
            var B = this;
            this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
                role: "listbox",
                "aria-activedescendant": "ui-active-menuitem"
            }).click(function (C) {
                if (A(C.target).closest(".ui-menu-item a").length) {
                    C.preventDefault();
                    B.select(C)
                }
            });
            this.refresh()
        }, refresh: function () {
            var B = this;
            this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem").children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function (C) {
                B.activate(C, A(this).parent())
            }).mouseleave(function () {
                B.deactivate()
            })
        }, activate: function (C, D) {
            this.deactivate();
            if (this.hasScroll()) {
                var B = D.offset().top - this.element.offset().top, F = this.element.attr("scrollTop"), E = this.element.height();
                if (B < 0) {
                    this.element.attr("scrollTop", F + B)
                } else {
                    B >= E && this.element.attr("scrollTop", F + B - E + D.height())
                }
            }
            this.active = D.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end();
            this._trigger("focus", C, {item: D})
        }, deactivate: function () {
            if (this.active) {
                this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
                this._trigger("blur");
                this.active = null
            }
        }, next: function (B) {
            this.move("next", ".ui-menu-item:first", B)
        }, previous: function (B) {
            this.move("prev", ".ui-menu-item:last", B)
        }, first: function () {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        }, last: function () {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        }, move: function (C, D, B) {
            if (this.active) {
                C = this.active[C + "All"](".ui-menu-item").eq(0);
                C.length ? this.activate(B, C) : this.activate(B, this.element.children(D))
            } else {
                this.activate(B, this.element.children(D))
            }
        }, nextPage: function (C) {
            if (this.hasScroll()) {
                if (!this.active || this.last()) {
                    this.activate(C, this.element.children(".ui-menu-item:first"))
                } else {
                    var D = this.active.offset().top, B = this.element.height(), E = this.element.children(".ui-menu-item").filter(function () {
                        var F = A(this).offset().top - D - B + A(this).height();
                        return F < 10 && F > -10
                    });
                    E.length || (E = this.element.children(".ui-menu-item:last"));
                    this.activate(C, E)
                }
            } else {
                this.activate(C, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" : ":last"))
            }
        }, previousPage: function (C) {
            if (this.hasScroll()) {
                if (!this.active || this.first()) {
                    this.activate(C, this.element.children(".ui-menu-item:last"))
                } else {
                    var D = this.active.offset().top, B = this.element.height();
                    result = this.element.children(".ui-menu-item").filter(function () {
                        var E = A(this).offset().top - D + B - A(this).height();
                        return E < 10 && E > -10
                    });
                    result.length || (result = this.element.children(".ui-menu-item:first"));
                    this.activate(C, result)
                }
            } else {
                this.activate(C, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" : ":first"))
            }
        }, hasScroll: function () {
            return this.element.height() < this.element.attr("scrollHeight")
        }, select: function (B) {
            this._trigger("selected", B, {item: this.active})
        }
    })
})(jQuery);
(function (D) {
    var B, C = function (E) {
        D(":ui-button", E.target.form).each(function () {
            var F = D(this).data("button");
            setTimeout(function () {
                F.refresh()
            }, 1)
        })
    }, A = function (H) {
        var G = H.name, F = H.form, E = D([]);
        if (G) {
            E = F ? D(F).find("[name='" + G + "']") : D("[name='" + G + "']", H.ownerDocument).filter(function () {
                return !this.form
            })
        }
        return E
    };
    D.widget("ui.button", {
        options: {disabled: null, text: true, label: null, icons: {primary: null, secondary: null}},
        _create: function () {
            this.element.closest("form").unbind("reset.button").bind("reset.button", C);
            if (typeof this.options.disabled !== "boolean") {
                this.options.disabled = this.element.attr("disabled")
            }
            this._determineButtonType();
            this.hasTitle = !!this.buttonElement.attr("title");
            var H = this, G = this.options, F = this.type === "checkbox" || this.type === "radio", E = "ui-state-hover" + (!F ? " ui-state-active" : "");
            if (G.label === null) {
                G.label = this.buttonElement.html()
            }
            if (this.element.is(":disabled")) {
                G.disabled = true
            }
            this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role", "button").bind("mouseenter.button", function () {
                if (!G.disabled) {
                    D(this).addClass("ui-state-hover");
                    this === B && D(this).addClass("ui-state-active")
                }
            }).bind("mouseleave.button", function () {
                G.disabled || D(this).removeClass(E)
            }).bind("focus.button", function () {
                D(this).addClass("ui-state-focus")
            }).bind("blur.button", function () {
                D(this).removeClass("ui-state-focus")
            });
            F && this.element.bind("change.button", function () {
                H.refresh()
            });
            if (this.type === "checkbox") {
                this.buttonElement.bind("click.button", function () {
                    if (G.disabled) {
                        return false
                    }
                    D(this).toggleClass("ui-state-active");
                    H.buttonElement.attr("aria-pressed", H.element[0].checked)
                })
            } else {
                if (this.type === "radio") {
                    this.buttonElement.bind("click.button", function () {
                        if (G.disabled) {
                            return false
                        }
                        D(this).addClass("ui-state-active");
                        H.buttonElement.attr("aria-pressed", true);
                        var I = H.element[0];
                        A(I).not(I).map(function () {
                            return D(this).button("widget")[0]
                        }).removeClass("ui-state-active").attr("aria-pressed", false)
                    })
                } else {
                    this.buttonElement.bind("mousedown.button", function () {
                        if (G.disabled) {
                            return false
                        }
                        D(this).addClass("ui-state-active");
                        B = this;
                        D(document).one("mouseup", function () {
                            B = null
                        })
                    }).bind("mouseup.button", function () {
                        if (G.disabled) {
                            return false
                        }
                        D(this).removeClass("ui-state-active")
                    }).bind("keydown.button", function (I) {
                        if (G.disabled) {
                            return false
                        }
                        if (I.keyCode == D.ui.keyCode.SPACE || I.keyCode == D.ui.keyCode.ENTER) {
                            D(this).addClass("ui-state-active")
                        }
                    }).bind("keyup.button", function () {
                        D(this).removeClass("ui-state-active")
                    });
                    this.buttonElement.is("a") && this.buttonElement.keyup(function (I) {
                        I.keyCode === D.ui.keyCode.SPACE && D(this).click()
                    })
                }
            }
            this._setOption("disabled", G.disabled)
        },
        _determineButtonType: function () {
            this.type = this.element.is(":checkbox") ? "checkbox" : this.element.is(":radio") ? "radio" : this.element.is("input") ? "input" : "button";
            if (this.type === "checkbox" || this.type === "radio") {
                var F = this.element.parents().filter(":last"), E = "label[for=" + this.element.attr("id") + "]";
                this.buttonElement = F.find(E);
                if (!this.buttonElement.length) {
                    F = F.length ? F.siblings() : this.element.siblings();
                    this.buttonElement = F.filter(E);
                    if (!this.buttonElement.length) {
                        this.buttonElement = F.find(E)
                    }
                }
                this.element.addClass("ui-helper-hidden-accessible");
                (F = this.element.is(":checked")) && this.buttonElement.addClass("ui-state-active");
                this.buttonElement.attr("aria-pressed", F)
            } else {
                this.buttonElement = this.element
            }
        },
        widget: function () {
            return this.buttonElement
        },
        destroy: function () {
            this.element.removeClass("ui-helper-hidden-accessible");
            this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
            this.hasTitle || this.buttonElement.removeAttr("title");
            D.Widget.prototype.destroy.call(this)
        },
        _setOption: function (F, E) {
            D.Widget.prototype._setOption.apply(this, arguments);
            if (F === "disabled") {
                E ? this.element.attr("disabled", true) : this.element.removeAttr("disabled")
            }
            this._resetButton()
        },
        refresh: function () {
            var E = this.element.is(":disabled");
            E !== this.options.disabled && this._setOption("disabled", E);
            if (this.type === "radio") {
                A(this.element[0]).each(function () {
                    D(this).is(":checked") ? D(this).button("widget").addClass("ui-state-active").attr("aria-pressed", true) : D(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", false)
                })
            } else {
                if (this.type === "checkbox") {
                    this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", true) : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", false)
                }
            }
        },
        _resetButton: function () {
            if (this.type === "input") {
                this.options.label && this.element.val(this.options.label)
            } else {
                var I = this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"), H = D("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(I.empty()).text(), G = this.options.icons, E = G.primary && G.secondary, F = [];
                if (G.primary || G.secondary) {
                    if (this.options.text) {
                        F.push("ui-button-text-icon" + (E ? "s" : G.primary ? "-primary" : "-secondary"))
                    }
                    G.primary && I.prepend("<span class='ui-button-icon-primary ui-icon " + G.primary + "'></span>");
                    G.secondary && I.append("<span class='ui-button-icon-secondary ui-icon " + G.secondary + "'></span>");
                    if (!this.options.text) {
                        F.push(E ? "ui-button-icons-only" : "ui-button-icon-only");
                        this.hasTitle || I.attr("title", H)
                    }
                } else {
                    F.push("ui-button-text-only")
                }
                I.addClass(F.join(" "))
            }
        }
    });
    D.widget("ui.buttonset", {
        options: {items: ":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},
        _create: function () {
            this.element.addClass("ui-buttonset")
        },
        _init: function () {
            this.refresh()
        },
        _setOption: function (F, E) {
            F === "disabled" && this.buttons.button("option", F, E);
            D.Widget.prototype._setOption.apply(this, arguments)
        },
        refresh: function () {
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function () {
                return D(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass("ui-corner-left").end().filter(":last").addClass("ui-corner-right").end().end()
        },
        destroy: function () {
            this.element.removeClass("ui-buttonset");
            this.buttons.map(function () {
                return D(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
            D.Widget.prototype.destroy.call(this)
        }
    })
})(jQuery);
(function (b, d) {
    function e() {
        this.debug = false;
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._inDialog = this._datepickerShowing = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            yearRange: "c-10:c+10",
            showOtherMonths: false,
            selectOtherMonths: false,
            showWeek: false,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: true,
            showButtonPanel: false,
            autoSize: false
        };
        b.extend(this._defaults, this.regional[""]);
        this.dpDiv = b('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')
    }

    function g(a, c) {
        b.extend(a, c);
        for (var h in c) {
            if (c[h] == null || c[h] == d) {
                a[h] = c[h]
            }
        }
        return a
    }

    b.extend(b.ui, {datepicker: {version: "1.8.11"}});
    var f = (new Date).getTime();
    b.extend(e.prototype, {
        markerClassName: "hasDatepicker",
        log: function () {
            this.debug && console.log.apply("", arguments)
        },
        _widgetDatepicker: function () {
            return this.dpDiv
        },
        setDefaults: function (a) {
            g(this._defaults, a || {});
            return this
        },
        _attachDatepicker: function (a, c) {
            var h = null;
            for (var i in this._defaults) {
                var j = a.getAttribute("date:" + i);
                if (j) {
                    h = h || {};
                    try {
                        h[i] = eval(j)
                    } catch (n) {
                        h[i] = j
                    }
                }
            }
            i = a.nodeName.toLowerCase();
            j = i == "div" || i == "span";
            if (!a.id) {
                this.uuid += 1;
                a.id = "dp" + this.uuid
            }
            var p = this._newInst(b(a), j);
            p.settings = b.extend({}, c || {}, h || {});
            if (i == "input") {
                this._connectDatepicker(a, p)
            } else {
                j && this._inlineDatepicker(a, p)
            }
        },
        _newInst: function (a, c) {
            return {
                id: a[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1"),
                input: a,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: c,
                dpDiv: !c ? this.dpDiv : b('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')
            }
        },
        _connectDatepicker: function (a, c) {
            var h = b(a);
            c.append = b([]);
            c.trigger = b([]);
            if (!h.hasClass(this.markerClassName)) {
                this._attachments(h, c);
                h.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function (i, j, n) {
                    c.settings[j] = n
                }).bind("getData.datepicker", function (i, j) {
                    return this._get(c, j)
                });
                this._autoSize(c);
                b.data(a, "datepicker", c)
            }
        },
        _attachments: function (a, c) {
            var h = this._get(c, "appendText"), i = this._get(c, "isRTL");
            c.append && c.append.remove();
            if (h) {
                c.append = b('<span class="' + this._appendClass + '">' + h + "</span>");
                a[i ? "before" : "after"](c.append)
            }
            a.unbind("focus", this._showDatepicker);
            c.trigger && c.trigger.remove();
            h = this._get(c, "showOn");
            if (h == "focus" || h == "both") {
                a.focus(this._showDatepicker)
            }
            if (h == "button" || h == "both") {
                h = this._get(c, "buttonText");
                var j = this._get(c, "buttonImage");
                c.trigger = b(this._get(c, "buttonImageOnly") ? b("<img/>").addClass(this._triggerClass).attr({
                    src: j,
                    alt: h,
                    title: h
                }) : b('<button type="button"></button>').addClass(this._triggerClass).html(j == "" ? h : b("<img/>").attr({
                    src: j,
                    alt: h,
                    title: h
                })));
                a[i ? "before" : "after"](c.trigger);
                c.trigger.click(function () {
                    b.datepicker._datepickerShowing && b.datepicker._lastInput == a[0] ? b.datepicker._hideDatepicker() : b.datepicker._showDatepicker(a[0]);
                    return false
                })
            }
        },
        _autoSize: function (a) {
            if (this._get(a, "autoSize") && !a.inline) {
                var c = new Date(2009, 11, 20), h = this._get(a, "dateFormat");
                if (h.match(/[DM]/)) {
                    var i = function (j) {
                        for (var n = 0, p = 0, l = 0; l < j.length; l++) {
                            if (j[l].length > n) {
                                n = j[l].length;
                                p = l
                            }
                        }
                        return p
                    };
                    c.setMonth(i(this._get(a, h.match(/MM/) ? "monthNames" : "monthNamesShort")));
                    c.setDate(i(this._get(a, h.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - c.getDay())
                }
                a.input.attr("size", this._formatDate(a, c).length)
            }
        },
        _inlineDatepicker: function (a, c) {
            var h = b(a);
            if (!h.hasClass(this.markerClassName)) {
                h.addClass(this.markerClassName).append(c.dpDiv).bind("setData.datepicker", function (i, j, n) {
                    c.settings[j] = n
                }).bind("getData.datepicker", function (i, j) {
                    return this._get(c, j)
                });
                b.data(a, "datepicker", c);
                this._setDate(c, this._getDefaultDate(c), true);
                this._updateDatepicker(c);
                this._updateAlternate(c);
                c.dpDiv.show()
            }
        },
        _dialogDatepicker: function (a, c, h, i, j) {
            a = this._dialogInst;
            if (!a) {
                this.uuid += 1;
                this._dialogInput = b('<input type="text" id="' + ("dp" + this.uuid) + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
                this._dialogInput.keydown(this._doKeyDown);
                b("body").append(this._dialogInput);
                a = this._dialogInst = this._newInst(this._dialogInput, false);
                a.settings = {};
                b.data(this._dialogInput[0], "datepicker", a)
            }
            g(a.settings, i || {});
            c = c && c.constructor == Date ? this._formatDate(a, c) : c;
            this._dialogInput.val(c);
            this._pos = j ? j.length ? j : [j.pageX, j.pageY] : null;
            if (!this._pos) {
                this._pos = [document.documentElement.clientWidth / 2 - 100 + (document.documentElement.scrollLeft || document.body.scrollLeft), document.documentElement.clientHeight / 2 - 150 + (document.documentElement.scrollTop || document.body.scrollTop)]
            }
            this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px");
            a.settings.onSelect = h;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            b.blockUI && b.blockUI(this.dpDiv);
            b.data(this._dialogInput[0], "datepicker", a);
            return this
        },
        _destroyDatepicker: function (a) {
            var c = b(a), h = b.data(a, "datepicker");
            if (c.hasClass(this.markerClassName)) {
                var i = a.nodeName.toLowerCase();
                b.removeData(a, "datepicker");
                if (i == "input") {
                    h.append.remove();
                    h.trigger.remove();
                    c.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)
                } else {
                    if (i == "div" || i == "span") {
                        c.removeClass(this.markerClassName).empty()
                    }
                }
            }
        },
        _enableDatepicker: function (a) {
            var c = b(a), h = b.data(a, "datepicker");
            if (c.hasClass(this.markerClassName)) {
                var i = a.nodeName.toLowerCase();
                if (i == "input") {
                    a.disabled = false;
                    h.trigger.filter("button").each(function () {
                        this.disabled = false
                    }).end().filter("img").css({opacity: "1.0", cursor: ""})
                } else {
                    if (i == "div" || i == "span") {
                        c.children("." + this._inlineClass).children().removeClass("ui-state-disabled")
                    }
                }
                this._disabledInputs = b.map(this._disabledInputs, function (j) {
                    return j == a ? null : j
                })
            }
        },
        _disableDatepicker: function (a) {
            var c = b(a), h = b.data(a, "datepicker");
            if (c.hasClass(this.markerClassName)) {
                var i = a.nodeName.toLowerCase();
                if (i == "input") {
                    a.disabled = true;
                    h.trigger.filter("button").each(function () {
                        this.disabled = true
                    }).end().filter("img").css({opacity: "0.5", cursor: "default"})
                } else {
                    if (i == "div" || i == "span") {
                        c.children("." + this._inlineClass).children().addClass("ui-state-disabled")
                    }
                }
                this._disabledInputs = b.map(this._disabledInputs, function (j) {
                    return j == a ? null : j
                });
                this._disabledInputs[this._disabledInputs.length] = a
            }
        },
        _isDisabledDatepicker: function (a) {
            if (!a) {
                return false
            }
            for (var c = 0; c < this._disabledInputs.length; c++) {
                if (this._disabledInputs[c] == a) {
                    return true
                }
            }
            return false
        },
        _getInst: function (a) {
            try {
                return b.data(a, "datepicker")
            } catch (c) {
                throw"Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function (a, c, h) {
            var i = this._getInst(a);
            if (arguments.length == 2 && typeof c == "string") {
                return c == "defaults" ? b.extend({}, b.datepicker._defaults) : i ? c == "all" ? b.extend({}, i.settings) : this._get(i, c) : null
            }
            var j = c || {};
            if (typeof c == "string") {
                j = {};
                j[c] = h
            }
            if (i) {
                this._curInst == i && this._hideDatepicker();
                var n = this._getDateDatepicker(a, true), p = this._getMinMaxDate(i, "min"), l = this._getMinMaxDate(i, "max");
                g(i.settings, j);
                if (p !== null && j.dateFormat !== d && j.minDate === d) {
                    i.settings.minDate = this._formatDate(i, p)
                }
                if (l !== null && j.dateFormat !== d && j.maxDate === d) {
                    i.settings.maxDate = this._formatDate(i, l)
                }
                this._attachments(b(a), i);
                this._autoSize(i);
                this._setDateDatepicker(a, n);
                this._updateDatepicker(i)
            }
        },
        _changeDatepicker: function (a, c, h) {
            this._optionDatepicker(a, c, h)
        },
        _refreshDatepicker: function (a) {
            (a = this._getInst(a)) && this._updateDatepicker(a)
        },
        _setDateDatepicker: function (a, c) {
            if (a = this._getInst(a)) {
                this._setDate(a, c);
                this._updateDatepicker(a);
                this._updateAlternate(a)
            }
        },
        _getDateDatepicker: function (a, c) {
            (a = this._getInst(a)) && !a.inline && this._setDateFromField(a, c);
            return a ? this._getDate(a) : null
        },
        _doKeyDown: function (a) {
            var c = b.datepicker._getInst(a.target), h = true, i = c.dpDiv.is(".ui-datepicker-rtl");
            c._keyEvent = true;
            if (b.datepicker._datepickerShowing) {
                switch (a.keyCode) {
                    case 9:
                        b.datepicker._hideDatepicker();
                        h = false;
                        break;
                    case 13:
                        h = b("td." + b.datepicker._dayOverClass + ":not(." + b.datepicker._currentClass + ")", c.dpDiv);
                        h[0] ? b.datepicker._selectDay(a.target, c.selectedMonth, c.selectedYear, h[0]) : b.datepicker._hideDatepicker();
                        return false;
                    case 27:
                        b.datepicker._hideDatepicker();
                        break;
                    case 33:
                        b.datepicker._adjustDate(a.target, a.ctrlKey ? -b.datepicker._get(c, "stepBigMonths") : -b.datepicker._get(c, "stepMonths"), "M");
                        break;
                    case 34:
                        b.datepicker._adjustDate(a.target, a.ctrlKey ? +b.datepicker._get(c, "stepBigMonths") : +b.datepicker._get(c, "stepMonths"), "M");
                        break;
                    case 35:
                        if (a.ctrlKey || a.metaKey) {
                            b.datepicker._clearDate(a.target)
                        }
                        h = a.ctrlKey || a.metaKey;
                        break;
                    case 36:
                        if (a.ctrlKey || a.metaKey) {
                            b.datepicker._gotoToday(a.target)
                        }
                        h = a.ctrlKey || a.metaKey;
                        break;
                    case 37:
                        if (a.ctrlKey || a.metaKey) {
                            b.datepicker._adjustDate(a.target, i ? +1 : -1, "D")
                        }
                        h = a.ctrlKey || a.metaKey;
                        if (a.originalEvent.altKey) {
                            b.datepicker._adjustDate(a.target, a.ctrlKey ? -b.datepicker._get(c, "stepBigMonths") : -b.datepicker._get(c, "stepMonths"), "M")
                        }
                        break;
                    case 38:
                        if (a.ctrlKey || a.metaKey) {
                            b.datepicker._adjustDate(a.target, -7, "D")
                        }
                        h = a.ctrlKey || a.metaKey;
                        break;
                    case 39:
                        if (a.ctrlKey || a.metaKey) {
                            b.datepicker._adjustDate(a.target, i ? -1 : +1, "D")
                        }
                        h = a.ctrlKey || a.metaKey;
                        if (a.originalEvent.altKey) {
                            b.datepicker._adjustDate(a.target, a.ctrlKey ? +b.datepicker._get(c, "stepBigMonths") : +b.datepicker._get(c, "stepMonths"), "M")
                        }
                        break;
                    case 40:
                        if (a.ctrlKey || a.metaKey) {
                            b.datepicker._adjustDate(a.target, +7, "D")
                        }
                        h = a.ctrlKey || a.metaKey;
                        break;
                    default:
                        h = false
                }
            } else {
                if (a.keyCode == 36 && a.ctrlKey) {
                    b.datepicker._showDatepicker(this)
                } else {
                    h = false
                }
            }
            if (h) {
                a.preventDefault();
                a.stopPropagation()
            }
        },
        _doKeyPress: function (a) {
            var c = b.datepicker._getInst(a.target);
            if (b.datepicker._get(c, "constrainInput")) {
                c = b.datepicker._possibleChars(b.datepicker._get(c, "dateFormat"));
                var h = String.fromCharCode(a.charCode == d ? a.keyCode : a.charCode);
                return a.ctrlKey || a.metaKey || h < " " || !c || c.indexOf(h) > -1
            }
        },
        _doKeyUp: function (a) {
            a = b.datepicker._getInst(a.target);
            if (a.input.val() != a.lastVal) {
                try {
                    if (b.datepicker.parseDate(b.datepicker._get(a, "dateFormat"), a.input ? a.input.val() : null, b.datepicker._getFormatConfig(a))) {
                        b.datepicker._setDateFromField(a);
                        b.datepicker._updateAlternate(a);
                        b.datepicker._updateDatepicker(a)
                    }
                } catch (c) {
                    b.datepicker.log(c)
                }
            }
            return true
        },
        _showDatepicker: function (a) {
            a = a.target || a;
            if (a.nodeName.toLowerCase() != "input") {
                a = b("input", a.parentNode)[0]
            }
            if (!(b.datepicker._isDisabledDatepicker(a) || b.datepicker._lastInput == a)) {
                var c = b.datepicker._getInst(a);
                b.datepicker._curInst && b.datepicker._curInst != c && b.datepicker._curInst.dpDiv.stop(true, true);
                var h = b.datepicker._get(c, "beforeShow");
                g(c.settings, h ? h.apply(a, [a, c]) : {});
                c.lastVal = null;
                b.datepicker._lastInput = a;
                b.datepicker._setDateFromField(c);
                if (b.datepicker._inDialog) {
                    a.value = ""
                }
                if (!b.datepicker._pos) {
                    b.datepicker._pos = b.datepicker._findPos(a);
                    b.datepicker._pos[1] += a.offsetHeight
                }
                var i = false;
                b(a).parents().each(function () {
                    i |= b(this).css("position") == "fixed";
                    return !i
                });
                if (i && b.browser.opera) {
                    b.datepicker._pos[0] -= document.documentElement.scrollLeft;
                    b.datepicker._pos[1] -= document.documentElement.scrollTop
                }
                h = {left: b.datepicker._pos[0], top: b.datepicker._pos[1]};
                b.datepicker._pos = null;
                c.dpDiv.empty();
                c.dpDiv.css({position: "absolute", display: "block", top: "-1000px"});
                b.datepicker._updateDatepicker(c);
                h = b.datepicker._checkOffset(c, h, i);
                c.dpDiv.css({
                    position: b.datepicker._inDialog && b.blockUI ? "static" : i ? "fixed" : "absolute",
                    display: "none",
                    left: h.left + "px",
                    top: h.top + "px"
                });
                if (!c.inline) {
                    h = b.datepicker._get(c, "showAnim");
                    var j = b.datepicker._get(c, "duration"), n = function () {
                        b.datepicker._datepickerShowing = true;
                        var p = c.dpDiv.find("iframe.ui-datepicker-cover");
                        if (p.length) {
                            var l = b.datepicker._getBorders(c.dpDiv);
                            p.css({left: -l[0], top: -l[1], width: c.dpDiv.outerWidth(), height: c.dpDiv.outerHeight()})
                        }
                    };
                    c.dpDiv.zIndex(b(a).zIndex() + 1);
                    b.effects && b.effects[h] ? c.dpDiv.show(h, b.datepicker._get(c, "showOptions"), j, n) : c.dpDiv[h || "show"](h ? j : null, n);
                    if (!h || !j) {
                        n()
                    }
                    c.input.is(":visible") && !c.input.is(":disabled") && c.input.focus();
                    b.datepicker._curInst = c
                }
            }
        },
        _updateDatepicker: function (a) {
            var c = this, h = b.datepicker._getBorders(a.dpDiv);
            a.dpDiv.empty().append(this._generateHTML(a));
            var i = a.dpDiv.find("iframe.ui-datepicker-cover");
            i.length && i.css({left: -h[0], top: -h[1], width: a.dpDiv.outerWidth(), height: a.dpDiv.outerHeight()});
            a.dpDiv.find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout", function () {
                b(this).removeClass("ui-state-hover");
                this.className.indexOf("ui-datepicker-prev") != -1 && b(this).removeClass("ui-datepicker-prev-hover");
                this.className.indexOf("ui-datepicker-next") != -1 && b(this).removeClass("ui-datepicker-next-hover")
            }).bind("mouseover", function () {
                if (!c._isDisabledDatepicker(a.inline ? a.dpDiv.parent()[0] : a.input[0])) {
                    b(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
                    b(this).addClass("ui-state-hover");
                    this.className.indexOf("ui-datepicker-prev") != -1 && b(this).addClass("ui-datepicker-prev-hover");
                    this.className.indexOf("ui-datepicker-next") != -1 && b(this).addClass("ui-datepicker-next-hover")
                }
            }).end().find("." + this._dayOverClass + " a").trigger("mouseover").end();
            h = this._getNumberOfMonths(a);
            i = h[1];
            i > 1 ? a.dpDiv.addClass("ui-datepicker-multi-" + i).css("width", 17 * i + "em") : a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            a.dpDiv[(h[0] != 1 || h[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            a.dpDiv[(this._get(a, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            a == b.datepicker._curInst && b.datepicker._datepickerShowing && a.input && a.input.is(":visible") && !a.input.is(":disabled") && a.input[0] != document.activeElement && a.input.focus();
            if (a.yearshtml) {
                var j = a.yearshtml;
                setTimeout(function () {
                    j === a.yearshtml && a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml);
                    j = a.yearshtml = null
                }, 0)
            }
        },
        _getBorders: function (a) {
            var c = function (h) {
                return {thin: 1, medium: 2, thick: 3}[h] || h
            };
            return [parseFloat(c(a.css("border-left-width"))), parseFloat(c(a.css("border-top-width")))]
        },
        _checkOffset: function (a, c, h) {
            var i = a.dpDiv.outerWidth(), j = a.dpDiv.outerHeight(), n = a.input ? a.input.outerWidth() : 0, p = a.input ? a.input.outerHeight() : 0, l = document.documentElement.clientWidth + b(document).scrollLeft(), k = document.documentElement.clientHeight + b(document).scrollTop();
            c.left -= this._get(a, "isRTL") ? i - n : 0;
            c.left -= h && c.left == a.input.offset().left ? b(document).scrollLeft() : 0;
            c.top -= h && c.top == a.input.offset().top + p ? b(document).scrollTop() : 0;
            c.left -= Math.min(c.left, c.left + i > l && l > i ? Math.abs(c.left + i - l) : 0);
            c.top -= Math.min(c.top, c.top + j > k && k > j ? Math.abs(j + p) : 0);
            return c
        },
        _findPos: function (a) {
            for (var c = this._get(this._getInst(a), "isRTL"); a && (a.type == "hidden" || a.nodeType != 1 || b.expr.filters.hidden(a));) {
                a = a[c ? "previousSibling" : "nextSibling"]
            }
            a = b(a).offset();
            return [a.left, a.top]
        },
        _hideDatepicker: function (a) {
            var c = this._curInst;
            if (!(!c || a && c != b.data(a, "datepicker"))) {
                if (this._datepickerShowing) {
                    a = this._get(c, "showAnim");
                    var h = this._get(c, "duration"), i = function () {
                        b.datepicker._tidyDialog(c);
                        this._curInst = null
                    };
                    b.effects && b.effects[a] ? c.dpDiv.hide(a, b.datepicker._get(c, "showOptions"), h, i) : c.dpDiv[a == "slideDown" ? "slideUp" : a == "fadeIn" ? "fadeOut" : "hide"](a ? h : null, i);
                    a || i();
                    if (a = this._get(c, "onClose")) {
                        a.apply(c.input ? c.input[0] : null, [c.input ? c.input.val() : "", c])
                    }
                    this._datepickerShowing = false;
                    this._lastInput = null;
                    if (this._inDialog) {
                        this._dialogInput.css({position: "absolute", left: "0", top: "-100px"});
                        if (b.blockUI) {
                            b.unblockUI();
                            b("body").append(this.dpDiv)
                        }
                    }
                    this._inDialog = false
                }
            }
        },
        _tidyDialog: function (a) {
            a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function (a) {
            if (b.datepicker._curInst) {
                a = b(a.target);
                a[0].id != b.datepicker._mainDivId && a.parents("#" + b.datepicker._mainDivId).length == 0 && !a.hasClass(b.datepicker.markerClassName) && !a.hasClass(b.datepicker._triggerClass) && b.datepicker._datepickerShowing && !(b.datepicker._inDialog && b.blockUI) && b.datepicker._hideDatepicker()
            }
        },
        _adjustDate: function (a, c, h) {
            a = b(a);
            var i = this._getInst(a[0]);
            if (!this._isDisabledDatepicker(a[0])) {
                this._adjustInstDate(i, c + (h == "M" ? this._get(i, "showCurrentAtPos") : 0), h);
                this._updateDatepicker(i)
            }
        },
        _gotoToday: function (a) {
            a = b(a);
            var c = this._getInst(a[0]);
            if (this._get(c, "gotoCurrent") && c.currentDay) {
                c.selectedDay = c.currentDay;
                c.drawMonth = c.selectedMonth = c.currentMonth;
                c.drawYear = c.selectedYear = c.currentYear
            } else {
                var h = new Date;
                c.selectedDay = h.getDate();
                c.drawMonth = c.selectedMonth = h.getMonth();
                c.drawYear = c.selectedYear = h.getFullYear()
            }
            this._notifyChange(c);
            this._adjustDate(a)
        },
        _selectMonthYear: function (a, c, h) {
            a = b(a);
            var i = this._getInst(a[0]);
            i._selectingMonthYear = false;
            i["selected" + (h == "M" ? "Month" : "Year")] = i["draw" + (h == "M" ? "Month" : "Year")] = parseInt(c.options[c.selectedIndex].value, 10);
            this._notifyChange(i);
            this._adjustDate(a)
        },
        _clickMonthYear: function (a) {
            var c = this._getInst(b(a)[0]);
            c.input && c._selectingMonthYear && setTimeout(function () {
                c.input.focus()
            }, 0);
            c._selectingMonthYear = !c._selectingMonthYear
        },
        _selectDay: function (a, c, h, i) {
            var j = b(a);
            if (!(b(i).hasClass(this._unselectableClass) || this._isDisabledDatepicker(j[0]))) {
                j = this._getInst(j[0]);
                j.selectedDay = j.currentDay = b("a", i).html();
                j.selectedMonth = j.currentMonth = c;
                j.selectedYear = j.currentYear = h;
                this._selectDate(a, this._formatDate(j, j.currentDay, j.currentMonth, j.currentYear))
            }
        },
        _clearDate: function (a) {
            a = b(a);
            this._getInst(a[0]);
            this._selectDate(a, "")
        },
        _selectDate: function (a, c) {
            a = this._getInst(b(a)[0]);
            c = c != null ? c : this._formatDate(a);
            a.input && a.input.val(c);
            this._updateAlternate(a);
            var h = this._get(a, "onSelect");
            if (h) {
                h.apply(a.input ? a.input[0] : null, [c, a])
            } else {
                a.input && a.input.trigger("change")
            }
            if (a.inline) {
                this._updateDatepicker(a)
            } else {
                this._hideDatepicker();
                this._lastInput = a.input[0];
                typeof a.input[0] != "object" && a.input.focus();
                this._lastInput = null
            }
        },
        _updateAlternate: function (a) {
            var c = this._get(a, "altField");
            if (c) {
                var h = this._get(a, "altFormat") || this._get(a, "dateFormat"), i = this._getDate(a), j = this.formatDate(h, i, this._getFormatConfig(a));
                b(c).each(function () {
                    b(this).val(j)
                })
            }
        },
        noWeekends: function (a) {
            a = a.getDay();
            return [a > 0 && a < 6, ""]
        },
        iso8601Week: function (a) {
            a = new Date(a.getTime());
            a.setDate(a.getDate() + 4 - (a.getDay() || 7));
            var c = a.getTime();
            a.setMonth(0);
            a.setDate(1);
            return Math.floor(Math.round((c - a) / 86400000) / 7) + 1
        },
        parseDate: function (a, c, h) {
            if (a == null || c == null) {
                throw"Invalid arguments"
            }
            c = typeof c == "object" ? c.toString() : c + "";
            if (c == "") {
                return null
            }
            var i = (h ? h.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            i = typeof i != "string" ? i : (new Date).getFullYear() % 100 + parseInt(i, 10);
            for (var j = (h ? h.dayNamesShort : null) || this._defaults.dayNamesShort, n = (h ? h.dayNames : null) || this._defaults.dayNames, p = (h ? h.monthNamesShort : null) || this._defaults.monthNamesShort, l = (h ? h.monthNames : null) || this._defaults.monthNames, k = h = -1, m = -1, o = -1, q = false, s = function (x) {
                (x = y + 1 < a.length && a.charAt(y + 1) == x) && y++;
                return x
            }, r = function (x) {
                var C = s(x);
                x = new RegExp("^\\d{1," + (x == "@" ? 14 : x == "!" ? 20 : x == "y" && C ? 4 : x == "o" ? 3 : 2) + "}");
                x = c.substring(w).match(x);
                if (!x) {
                    throw"Missing number at position " + w
                }
                w += x[0].length;
                return parseInt(x[0], 10)
            }, u = function (x, C, J) {
                x = s(x) ? J : C;
                for (C = 0; C < x.length; C++) {
                    if (c.substr(w, x[C].length).toLowerCase() == x[C].toLowerCase()) {
                        w += x[C].length;
                        return C + 1
                    }
                }
                throw"Unknown name at position " + w
            }, v = function () {
                if (c.charAt(w) != a.charAt(y)) {
                    throw"Unexpected literal at position " + w
                }
                w++
            }, w = 0, y = 0; y < a.length; y++) {
                if (q) {
                    if (a.charAt(y) == "'" && !s("'")) {
                        q = false
                    } else {
                        v()
                    }
                } else {
                    switch (a.charAt(y)) {
                        case"d":
                            m = r("d");
                            break;
                        case"D":
                            u("D", j, n);
                            break;
                        case"o":
                            o = r("o");
                            break;
                        case"m":
                            k = r("m");
                            break;
                        case"M":
                            k = u("M", p, l);
                            break;
                        case"y":
                            h = r("y");
                            break;
                        case"@":
                            var B = new Date(r("@"));
                            h = B.getFullYear();
                            k = B.getMonth() + 1;
                            m = B.getDate();
                            break;
                        case"!":
                            B = new Date((r("!") - this._ticksTo1970) / 10000);
                            h = B.getFullYear();
                            k = B.getMonth() + 1;
                            m = B.getDate();
                            break;
                        case"'":
                            if (s("'")) {
                                v()
                            } else {
                                q = true
                            }
                            break;
                        default:
                            v()
                    }
                }
            }
            if (h == -1) {
                h = (new Date).getFullYear()
            } else {
                if (h < 100) {
                    h += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (h <= i ? 0 : -100)
                }
            }
            if (o > -1) {
                k = 1;
                m = o;
                do {
                    i = this._getDaysInMonth(h, k - 1);
                    if (m <= i) {
                        break
                    }
                    k++;
                    m -= i
                } while (1)
            }
            B = this._daylightSavingAdjust(new Date(h, k - 1, m));
            if (B.getFullYear() != h || B.getMonth() + 1 != k || B.getDate() != m) {
                throw"Invalid date"
            }
            return B
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 10000000,
        formatDate: function (a, c, h) {
            if (!c) {
                return ""
            }
            var i = (h ? h.dayNamesShort : null) || this._defaults.dayNamesShort, j = (h ? h.dayNames : null) || this._defaults.dayNames, n = (h ? h.monthNamesShort : null) || this._defaults.monthNamesShort;
            h = (h ? h.monthNames : null) || this._defaults.monthNames;
            var p = function (s) {
                (s = q + 1 < a.length && a.charAt(q + 1) == s) && q++;
                return s
            }, l = function (s, r, u) {
                r = "" + r;
                if (p(s)) {
                    for (; r.length < u;) {
                        r = "0" + r
                    }
                }
                return r
            }, k = function (s, r, u, v) {
                return p(s) ? v[r] : u[r]
            }, m = "", o = false;
            if (c) {
                for (var q = 0; q < a.length; q++) {
                    if (o) {
                        if (a.charAt(q) == "'" && !p("'")) {
                            o = false
                        } else {
                            m += a.charAt(q)
                        }
                    } else {
                        switch (a.charAt(q)) {
                            case"d":
                                m += l("d", c.getDate(), 2);
                                break;
                            case"D":
                                m += k("D", c.getDay(), i, j);
                                break;
                            case"o":
                                m += l("o", (c.getTime() - (new Date(c.getFullYear(), 0, 0)).getTime()) / 86400000, 3);
                                break;
                            case"m":
                                m += l("m", c.getMonth() + 1, 2);
                                break;
                            case"M":
                                m += k("M", c.getMonth(), n, h);
                                break;
                            case"y":
                                m += p("y") ? c.getFullYear() : (c.getYear() % 100 < 10 ? "0" : "") + c.getYear() % 100;
                                break;
                            case"@":
                                m += c.getTime();
                                break;
                            case"!":
                                m += c.getTime() * 10000 + this._ticksTo1970;
                                break;
                            case"'":
                                if (p("'")) {
                                    m += "'"
                                } else {
                                    o = true
                                }
                                break;
                            default:
                                m += a.charAt(q)
                        }
                    }
                }
            }
            return m
        },
        _possibleChars: function (a) {
            for (var c = "", h = false, i = function (n) {
                (n = j + 1 < a.length && a.charAt(j + 1) == n) && j++;
                return n
            }, j = 0; j < a.length; j++) {
                if (h) {
                    if (a.charAt(j) == "'" && !i("'")) {
                        h = false
                    } else {
                        c += a.charAt(j)
                    }
                } else {
                    switch (a.charAt(j)) {
                        case"d":
                        case"m":
                        case"y":
                        case"@":
                            c += "0123456789";
                            break;
                        case"D":
                        case"M":
                            return null;
                        case"'":
                            if (i("'")) {
                                c += "'"
                            } else {
                                h = true
                            }
                            break;
                        default:
                            c += a.charAt(j)
                    }
                }
            }
            return c
        },
        _get: function (a, c) {
            return a.settings[c] !== d ? a.settings[c] : this._defaults[c]
        },
        _setDateFromField: function (a, c) {
            if (a.input.val() != a.lastVal) {
                var h = this._get(a, "dateFormat"), i = a.lastVal = a.input ? a.input.val() : null, j, n;
                j = n = this._getDefaultDate(a);
                var p = this._getFormatConfig(a);
                try {
                    j = this.parseDate(h, i, p) || n
                } catch (l) {
                    this.log(l);
                    i = c ? "" : i
                }
                a.selectedDay = j.getDate();
                a.drawMonth = a.selectedMonth = j.getMonth();
                a.drawYear = a.selectedYear = j.getFullYear();
                a.currentDay = i ? j.getDate() : 0;
                a.currentMonth = i ? j.getMonth() : 0;
                a.currentYear = i ? j.getFullYear() : 0;
                this._adjustInstDate(a)
            }
        },
        _getDefaultDate: function (a) {
            return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date))
        },
        _determineDate: function (a, c, h) {
            var i = function (n) {
                var p = new Date;
                p.setDate(p.getDate() + n);
                return p
            }, j = function (n) {
                try {
                    return b.datepicker.parseDate(b.datepicker._get(a, "dateFormat"), n, b.datepicker._getFormatConfig(a))
                } catch (p) {
                }
                var l = (n.toLowerCase().match(/^c/) ? b.datepicker._getDate(a) : null) || new Date, k = l.getFullYear(), m = l.getMonth();
                l = l.getDate();
                for (var o = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, q = o.exec(n); q;) {
                    switch (q[2] || "d") {
                        case"d":
                        case"D":
                            l += parseInt(q[1], 10);
                            break;
                        case"w":
                        case"W":
                            l += parseInt(q[1], 10) * 7;
                            break;
                        case"m":
                        case"M":
                            m += parseInt(q[1], 10);
                            l = Math.min(l, b.datepicker._getDaysInMonth(k, m));
                            break;
                        case"y":
                        case"Y":
                            k += parseInt(q[1], 10);
                            l = Math.min(l, b.datepicker._getDaysInMonth(k, m));
                            break
                    }
                    q = o.exec(n)
                }
                return new Date(k, m, l)
            };
            if (c = (c = c == null || c === "" ? h : typeof c == "string" ? j(c) : typeof c == "number" ? isNaN(c) ? h : i(c) : new Date(c.getTime())) && c.toString() == "Invalid Date" ? h : c) {
                c.setHours(0);
                c.setMinutes(0);
                c.setSeconds(0);
                c.setMilliseconds(0)
            }
            return this._daylightSavingAdjust(c)
        },
        _daylightSavingAdjust: function (a) {
            if (!a) {
                return null
            }
            a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0);
            return a
        },
        _setDate: function (a, c, h) {
            var i = !c, j = a.selectedMonth, n = a.selectedYear;
            c = this._restrictMinMax(a, this._determineDate(a, c, new Date));
            a.selectedDay = a.currentDay = c.getDate();
            a.drawMonth = a.selectedMonth = a.currentMonth = c.getMonth();
            a.drawYear = a.selectedYear = a.currentYear = c.getFullYear();
            if ((j != a.selectedMonth || n != a.selectedYear) && !h) {
                this._notifyChange(a)
            }
            this._adjustInstDate(a);
            if (a.input) {
                a.input.val(i ? "" : this._formatDate(a))
            }
        },
        _getDate: function (a) {
            return !a.currentYear || a.input && a.input.val() == "" ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay))
        },
        _generateHTML: function (a) {
            var c = new Date;
            c = this._daylightSavingAdjust(new Date(c.getFullYear(), c.getMonth(), c.getDate()));
            var h = this._get(a, "isRTL"), i = this._get(a, "showButtonPanel"), j = this._get(a, "hideIfNoPrevNext"), n = this._get(a, "navigationAsDateFormat"), p = this._getNumberOfMonths(a), l = this._get(a, "showCurrentAtPos"), k = this._get(a, "stepMonths"), m = p[0] != 1 || p[1] != 1, o = this._daylightSavingAdjust(!a.currentDay ? new Date(9999, 9, 9) : new Date(a.currentYear, a.currentMonth, a.currentDay)), q = this._getMinMaxDate(a, "min"), s = this._getMinMaxDate(a, "max");
            l = a.drawMonth - l;
            var r = a.drawYear;
            if (l < 0) {
                l += 12;
                r--
            }
            if (s) {
                var u = this._daylightSavingAdjust(new Date(s.getFullYear(), s.getMonth() - p[0] * p[1] + 1, s.getDate()));
                for (u = q && u < q ? q : u; this._daylightSavingAdjust(new Date(r, l, 1)) > u;) {
                    l--;
                    if (l < 0) {
                        l = 11;
                        r--
                    }
                }
            }
            a.drawMonth = l;
            a.drawYear = r;
            u = this._get(a, "prevText");
            u = !n ? u : this.formatDate(u, this._daylightSavingAdjust(new Date(r, l - k, 1)), this._getFormatConfig(a));
            u = this._canAdjustMonth(a, -1, r, l) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + f + ".datepicker._adjustDate('#" + a.id + "', -" + k + ", 'M');\" title=\"" + u + '"><span class="ui-icon ui-icon-circle-triangle-' + (h ? "e" : "w") + '">' + u + "</span></a>" : j ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + u + '"><span class="ui-icon ui-icon-circle-triangle-' + (h ? "e" : "w") + '">' + u + "</span></a>";
            var v = this._get(a, "nextText");
            v = !n ? v : this.formatDate(v, this._daylightSavingAdjust(new Date(r, l + k, 1)), this._getFormatConfig(a));
            j = this._canAdjustMonth(a, +1, r, l) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + f + ".datepicker._adjustDate('#" + a.id + "', +" + k + ", 'M');\" title=\"" + v + '"><span class="ui-icon ui-icon-circle-triangle-' + (h ? "w" : "e") + '">' + v + "</span></a>" : j ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + v + '"><span class="ui-icon ui-icon-circle-triangle-' + (h ? "w" : "e") + '">' + v + "</span></a>";
            k = this._get(a, "currentText");
            v = this._get(a, "gotoCurrent") && a.currentDay ? o : c;
            k = !n ? k : this.formatDate(k, v, this._getFormatConfig(a));
            n = !a.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + f + '.datepicker._hideDatepicker();">' + this._get(a, "closeText") + "</button>" : "";
            i = i ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (h ? n : "") + (this._isInRange(a, v) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + f + ".datepicker._gotoToday('#" + a.id + "');\">" + k + "</button>" : "") + (h ? "" : n) + "</div>" : "";
            n = parseInt(this._get(a, "firstDay"), 10);
            n = isNaN(n) ? 0 : n;
            k = this._get(a, "showWeek");
            v = this._get(a, "dayNames");
            this._get(a, "dayNamesShort");
            var w = this._get(a, "dayNamesMin"), y = this._get(a, "monthNames"), B = this._get(a, "monthNamesShort"), x = this._get(a, "beforeShowDay"), C = this._get(a, "showOtherMonths"), J = this._get(a, "selectOtherMonths");
            this._get(a, "calculateWeek");
            for (var M = this._getDefaultDate(a), K = "", G = 0; G < p[0]; G++) {
                for (var N = "", H = 0; H < p[1]; H++) {
                    var O = this._daylightSavingAdjust(new Date(r, l, a.selectedDay)), A = " ui-corner-all", D = "";
                    if (m) {
                        D += '<div class="ui-datepicker-group';
                        if (p[1] > 1) {
                            switch (H) {
                                case 0:
                                    D += " ui-datepicker-group-first";
                                    A = " ui-corner-" + (h ? "right" : "left");
                                    break;
                                case p[1] - 1:
                                    D += " ui-datepicker-group-last";
                                    A = " ui-corner-" + (h ? "left" : "right");
                                    break;
                                default:
                                    D += " ui-datepicker-group-middle";
                                    A = "";
                                    break
                            }
                        }
                        D += '">'
                    }
                    D += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + A + '">' + (/all|left/.test(A) && G == 0 ? h ? j : u : "") + (/all|right/.test(A) && G == 0 ? h ? u : j : "") + this._generateMonthYearHeader(a, l, r, q, s, G > 0 || H > 0, y, B) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
                    var E = k ? '<th class="ui-datepicker-week-col">' + this._get(a, "weekHeader") + "</th>" : "";
                    for (A = 0; A < 7; A++) {
                        var z = (A + n) % 7;
                        E += "<th" + ((A + n + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + v[z] + '">' + w[z] + "</span></th>"
                    }
                    D += E + "</tr></thead><tbody>";
                    E = this._getDaysInMonth(r, l);
                    if (r == a.selectedYear && l == a.selectedMonth) {
                        a.selectedDay = Math.min(a.selectedDay, E)
                    }
                    A = (this._getFirstDayOfMonth(r, l) - n + 7) % 7;
                    E = m ? 6 : Math.ceil((A + E) / 7);
                    z = this._daylightSavingAdjust(new Date(r, l, 1 - A));
                    for (var P = 0; P < E; P++) {
                        D += "<tr>";
                        var Q = !k ? "" : '<td class="ui-datepicker-week-col">' + this._get(a, "calculateWeek")(z) + "</td>";
                        for (A = 0; A < 7; A++) {
                            var I = x ? x.apply(a.input ? a.input[0] : null, [z]) : [true, ""], F = z.getMonth() != l, L = F && !J || !I[0] || q && z < q || s && z > s;
                            Q += '<td class="' + ((A + n + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (F ? " ui-datepicker-other-month" : "") + (z.getTime() == O.getTime() && l == a.selectedMonth && a._keyEvent || M.getTime() == z.getTime() && M.getTime() == O.getTime() ? " " + this._dayOverClass : "") + (L ? " " + this._unselectableClass + " ui-state-disabled" : "") + (F && !C ? "" : " " + I[1] + (z.getTime() == o.getTime() ? " " + this._currentClass : "") + (z.getTime() == c.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!F || C) && I[2] ? ' title="' + I[2] + '"' : "") + (L ? "" : ' onclick="DP_jQuery_' + f + ".datepicker._selectDay('#" + a.id + "'," + z.getMonth() + "," + z.getFullYear() + ', this);return false;"') + ">" + (F && !C ? "&#xa0;" : L ? '<span class="ui-state-default">' + z.getDate() + "</span>" : '<a class="ui-state-default' + (z.getTime() == c.getTime() ? " ui-state-highlight" : "") + (z.getTime() == o.getTime() ? " ui-state-active" : "") + (F ? " ui-priority-secondary" : "") + '" href="#">' + z.getDate() + "</a>") + "</td>";
                            z.setDate(z.getDate() + 1);
                            z = this._daylightSavingAdjust(z)
                        }
                        D += Q + "</tr>"
                    }
                    l++;
                    if (l > 11) {
                        l = 0;
                        r++
                    }
                    D += "</tbody></table>" + (m ? "</div>" + (p[0] > 0 && H == p[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : "");
                    N += D
                }
                K += N
            }
            K += i + (b.browser.msie && parseInt(b.browser.version, 10) < 7 && !a.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : "");
            a._keyEvent = false;
            return K
        },
        _generateMonthYearHeader: function (a, c, h, i, j, n, p, l) {
            var k = this._get(a, "changeMonth"), m = this._get(a, "changeYear"), o = this._get(a, "showMonthAfterYear"), q = '<div class="ui-datepicker-title">', s = "";
            if (n || !k) {
                s += '<span class="ui-datepicker-month">' + p[c] + "</span>"
            } else {
                p = i && i.getFullYear() == h;
                var r = j && j.getFullYear() == h;
                s += '<select class="ui-datepicker-month" onchange="DP_jQuery_' + f + ".datepicker._selectMonthYear('#" + a.id + "', this, 'M');\" onclick=\"DP_jQuery_" + f + ".datepicker._clickMonthYear('#" + a.id + "');\">";
                for (var u = 0; u < 12; u++) {
                    if ((!p || u >= i.getMonth()) && (!r || u <= j.getMonth())) {
                        s += '<option value="' + u + '"' + (u == c ? ' selected="selected"' : "") + ">" + l[u] + "</option>"
                    }
                }
                s += "</select>"
            }
            o || (q += s + (n || !(k && m) ? "&#xa0;" : ""));
            a.yearshtml = "";
            if (n || !m) {
                q += '<span class="ui-datepicker-year">' + h + "</span>"
            } else {
                l = this._get(a, "yearRange").split(":");
                var v = (new Date).getFullYear();
                p = function (w) {
                    w = w.match(/c[+-].*/) ? h + parseInt(w.substring(1), 10) : w.match(/[+-].*/) ? v + parseInt(w, 10) : parseInt(w, 10);
                    return isNaN(w) ? v : w
                };
                c = p(l[0]);
                l = Math.max(c, p(l[1] || ""));
                c = i ? Math.max(c, i.getFullYear()) : c;
                l = j ? Math.min(l, j.getFullYear()) : l;
                for (a.yearshtml += '<select class="ui-datepicker-year" onchange="DP_jQuery_' + f + ".datepicker._selectMonthYear('#" + a.id + "', this, 'Y');\" onclick=\"DP_jQuery_" + f + ".datepicker._clickMonthYear('#" + a.id + "');\">"; c <= l; c++) {
                    a.yearshtml += '<option value="' + c + '"' + (c == h ? ' selected="selected"' : "") + ">" + c + "</option>"
                }
                a.yearshtml += "</select>";
                if (b.browser.mozilla) {
                    q += '<select class="ui-datepicker-year"><option value="' + h + '" selected="selected">' + h + "</option></select>"
                } else {
                    q += a.yearshtml;
                    a.yearshtml = null
                }
            }
            q += this._get(a, "yearSuffix");
            if (o) {
                q += (n || !(k && m) ? "&#xa0;" : "") + s
            }
            q += "</div>";
            return q
        },
        _adjustInstDate: function (a, c, h) {
            var i = a.drawYear + (h == "Y" ? c : 0), j = a.drawMonth + (h == "M" ? c : 0);
            c = Math.min(a.selectedDay, this._getDaysInMonth(i, j)) + (h == "D" ? c : 0);
            i = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(i, j, c)));
            a.selectedDay = i.getDate();
            a.drawMonth = a.selectedMonth = i.getMonth();
            a.drawYear = a.selectedYear = i.getFullYear();
            if (h == "M" || h == "Y") {
                this._notifyChange(a)
            }
        },
        _restrictMinMax: function (a, c) {
            var h = this._getMinMaxDate(a, "min");
            a = this._getMinMaxDate(a, "max");
            c = h && c < h ? h : c;
            return c = a && c > a ? a : c
        },
        _notifyChange: function (a) {
            var c = this._get(a, "onChangeMonthYear");
            if (c) {
                c.apply(a.input ? a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a])
            }
        },
        _getNumberOfMonths: function (a) {
            a = this._get(a, "numberOfMonths");
            return a == null ? [1, 1] : typeof a == "number" ? [1, a] : a
        },
        _getMinMaxDate: function (a, c) {
            return this._determineDate(a, this._get(a, c + "Date"), null)
        },
        _getDaysInMonth: function (a, c) {
            return 32 - this._daylightSavingAdjust(new Date(a, c, 32)).getDate()
        },
        _getFirstDayOfMonth: function (a, c) {
            return (new Date(a, c, 1)).getDay()
        },
        _canAdjustMonth: function (a, c, h, i) {
            var j = this._getNumberOfMonths(a);
            h = this._daylightSavingAdjust(new Date(h, i + (c < 0 ? c : j[0] * j[1]), 1));
            c < 0 && h.setDate(this._getDaysInMonth(h.getFullYear(), h.getMonth()));
            return this._isInRange(a, h)
        },
        _isInRange: function (a, c) {
            var h = this._getMinMaxDate(a, "min");
            a = this._getMinMaxDate(a, "max");
            return (!h || c.getTime() >= h.getTime()) && (!a || c.getTime() <= a.getTime())
        },
        _getFormatConfig: function (a) {
            var c = this._get(a, "shortYearCutoff");
            c = typeof c != "string" ? c : (new Date).getFullYear() % 100 + parseInt(c, 10);
            return {
                shortYearCutoff: c,
                dayNamesShort: this._get(a, "dayNamesShort"),
                dayNames: this._get(a, "dayNames"),
                monthNamesShort: this._get(a, "monthNamesShort"),
                monthNames: this._get(a, "monthNames")
            }
        },
        _formatDate: function (a, c, h, i) {
            if (!c) {
                a.currentDay = a.selectedDay;
                a.currentMonth = a.selectedMonth;
                a.currentYear = a.selectedYear
            }
            c = c ? typeof c == "object" ? c : this._daylightSavingAdjust(new Date(i, h, c)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
            return this.formatDate(this._get(a, "dateFormat"), c, this._getFormatConfig(a))
        }
    });
    b.fn.datepicker = function (a) {
        if (!this.length) {
            return this
        }
        if (!b.datepicker.initialized) {
            b(document).mousedown(b.datepicker._checkExternalClick).find("body").append(b.datepicker.dpDiv);
            b.datepicker.initialized = true
        }
        var c = Array.prototype.slice.call(arguments, 1);
        if (typeof a == "string" && (a == "isDisabled" || a == "getDate" || a == "widget")) {
            return b.datepicker["_" + a + "Datepicker"].apply(b.datepicker, [this[0]].concat(c))
        }
        if (a == "option" && arguments.length == 2 && typeof arguments[1] == "string") {
            return b.datepicker["_" + a + "Datepicker"].apply(b.datepicker, [this[0]].concat(c))
        }
        return this.each(function () {
            typeof a == "string" ? b.datepicker["_" + a + "Datepicker"].apply(b.datepicker, [this].concat(c)) : b.datepicker._attachDatepicker(this, a)
        })
    };
    b.datepicker = new e;
    b.datepicker.initialized = false;
    b.datepicker.uuid = (new Date).getTime();
    b.datepicker.version = "1.8.11";
    window["DP_jQuery_" + f] = b
})(jQuery);
(function (D, B) {
    var C = {
        buttons: true,
        height: true,
        maxHeight: true,
        maxWidth: true,
        minHeight: true,
        minWidth: true,
        width: true
    }, A = {maxHeight: true, maxWidth: true, minHeight: true, minWidth: true};
    D.widget("ui.dialog", {
        options: {
            autoOpen: true,
            buttons: {},
            closeOnEscape: true,
            closeText: "close",
            dialogClass: "",
            draggable: true,
            hide: null,
            height: "auto",
            maxHeight: false,
            maxWidth: false,
            minHeight: 150,
            minWidth: 150,
            modal: false,
            position: {
                my: "center", at: "center", collision: "fit", using: function (F) {
                    var E = D(this).css(F).offset().top;
                    E < 0 && D(this).css("top", F.top - E)
                }
            },
            resizable: true,
            show: null,
            stack: true,
            title: "",
            width: 300,
            zIndex: 1000
        }, _create: function () {
            this.originalTitle = this.element.attr("title");
            if (typeof this.originalTitle !== "string") {
                this.originalTitle = ""
            }
            this.options.title = this.options.title || this.originalTitle;
            var K = this, J = K.options, I = J.title || "&#160;", E = D.ui.dialog.getTitleId(K.element), F = (K.uiDialog = D("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " + J.dialogClass).css({zIndex: J.zIndex}).attr("tabIndex", -1).css("outline", 0).keydown(function (L) {
                if (J.closeOnEscape && L.keyCode && L.keyCode === D.ui.keyCode.ESCAPE) {
                    K.close(L);
                    L.preventDefault()
                }
            }).attr({role: "dialog", "aria-labelledby": E}).mousedown(function (L) {
                K.moveToTop(false, L)
            });
            K.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(F);
            var G = (K.uiDialogTitlebar = D("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(F), H = D('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function () {
                H.addClass("ui-state-hover")
            }, function () {
                H.removeClass("ui-state-hover")
            }).focus(function () {
                H.addClass("ui-state-focus")
            }).blur(function () {
                H.removeClass("ui-state-focus")
            }).click(function (L) {
                K.close(L);
                return false
            }).appendTo(G);
            (K.uiDialogTitlebarCloseText = D("<span></span>")).addClass("ui-icon ui-icon-closethick").text(J.closeText).appendTo(H);
            D("<span></span>").addClass("ui-dialog-title").attr("id", E).html(I).prependTo(G);
            if (D.isFunction(J.beforeclose) && !D.isFunction(J.beforeClose)) {
                J.beforeClose = J.beforeclose
            }
            G.find("*").add(G).disableSelection();
            J.draggable && D.fn.draggable && K._makeDraggable();
            J.resizable && D.fn.resizable && K._makeResizable();
            K._createButtons(J.buttons);
            K._isOpen = false;
            D.fn.bgiframe && F.bgiframe()
        }, _init: function () {
            this.options.autoOpen && this.open()
        }, destroy: function () {
            var E = this;
            E.overlay && E.overlay.destroy();
            E.uiDialog.hide();
            E.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
            E.uiDialog.remove();
            E.originalTitle && E.element.attr("title", E.originalTitle);
            return E
        }, widget: function () {
            return this.uiDialog
        }, close: function (H) {
            var G = this, F, E;
            if (false !== G._trigger("beforeClose", H)) {
                G.overlay && G.overlay.destroy();
                G.uiDialog.unbind("keypress.ui-dialog");
                G._isOpen = false;
                if (G.options.hide) {
                    G.uiDialog.hide(G.options.hide, function () {
                        G._trigger("close", H)
                    })
                } else {
                    G.uiDialog.hide();
                    G._trigger("close", H)
                }
                D.ui.dialog.overlay.resize();
                if (G.options.modal) {
                    F = 0;
                    D(".ui-dialog").each(function () {
                        if (this !== G.uiDialog[0]) {
                            E = D(this).css("z-index");
                            isNaN(E) || (F = Math.max(F, E))
                        }
                    });
                    D.ui.dialog.maxZ = F
                }
                return G
            }
        }, isOpen: function () {
            return this._isOpen
        }, moveToTop: function (H, G) {
            var F = this, E = F.options;
            if (E.modal && !H || !E.stack && !E.modal) {
                return F._trigger("focus", G)
            }
            if (E.zIndex > D.ui.dialog.maxZ) {
                D.ui.dialog.maxZ = E.zIndex
            }
            if (F.overlay) {
                D.ui.dialog.maxZ += 1;
                F.overlay.$el.css("z-index", D.ui.dialog.overlay.maxZ = D.ui.dialog.maxZ)
            }
            H = {scrollTop: F.element.attr("scrollTop"), scrollLeft: F.element.attr("scrollLeft")};
            D.ui.dialog.maxZ += 1;
            F.uiDialog.css("z-index", D.ui.dialog.maxZ);
            F.element.attr(H);
            F._trigger("focus", G);
            return F
        }, open: function () {
            if (!this._isOpen) {
                var G = this, F = G.options, E = G.uiDialog;
                G.overlay = F.modal ? new D.ui.dialog.overlay(G) : null;
                G._size();
                G._position(F.position);
                E.show(F.show);
                G.moveToTop(true);
                F.modal && E.bind("keypress.ui-dialog", function (H) {
                    if (H.keyCode === D.ui.keyCode.TAB) {
                        var I = D(":tabbable", this), J = I.filter(":first");
                        I = I.filter(":last");
                        if (H.target === I[0] && !H.shiftKey) {
                            J.focus(1);
                            return false
                        } else {
                            if (H.target === J[0] && H.shiftKey) {
                                I.focus(1);
                                return false
                            }
                        }
                    }
                });
                D(G.element.find(":tabbable").get().concat(E.find(".ui-dialog-buttonpane :tabbable").get().concat(E.get()))).eq(0).focus();
                G._isOpen = true;
                G._trigger("open");
                return G
            }
        }, _createButtons: function (I) {
            var H = this, G = false, E = D("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), F = D("<div></div>").addClass("ui-dialog-buttonset").appendTo(E);
            H.uiDialog.find(".ui-dialog-buttonpane").remove();
            typeof I === "object" && I !== null && D.each(I, function () {
                return !(G = true)
            });
            if (G) {
                D.each(I, function (K, J) {
                    J = D.isFunction(J) ? {click: J, text: K} : J;
                    K = D('<button type="button"></button>').attr(J, true).unbind("click").click(function () {
                        J.click.apply(H.element[0], arguments)
                    }).appendTo(F);
                    D.fn.button && K.button()
                });
                E.appendTo(H.uiDialog)
            }
        }, _makeDraggable: function () {
            function I(J) {
                return {position: J.position, offset: J.offset}
            }

            var H = this, G = H.options, E = D(document), F;
            H.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function (K, J) {
                    F = G.height === "auto" ? "auto" : D(this).height();
                    D(this).height(D(this).height()).addClass("ui-dialog-dragging");
                    H._trigger("dragStart", K, I(J))
                },
                drag: function (K, J) {
                    H._trigger("drag", K, I(J))
                },
                stop: function (K, J) {
                    G.position = [J.position.left - E.scrollLeft(), J.position.top - E.scrollTop()];
                    D(this).removeClass("ui-dialog-dragging").height(F);
                    H._trigger("dragStop", K, I(J));
                    D.ui.dialog.overlay.resize()
                }
            })
        }, _makeResizable: function (I) {
            function H(J) {
                return {
                    originalPosition: J.originalPosition,
                    originalSize: J.originalSize,
                    position: J.position,
                    size: J.size
                }
            }

            I = I === B ? this.options.resizable : I;
            var G = this, E = G.options, F = G.uiDialog.css("position");
            I = typeof I === "string" ? I : "n,e,s,w,se,sw,ne,nw";
            G.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: G.element,
                maxWidth: E.maxWidth,
                maxHeight: E.maxHeight,
                minWidth: E.minWidth,
                minHeight: G._minHeight(),
                handles: I,
                start: function (K, J) {
                    D(this).addClass("ui-dialog-resizing");
                    G._trigger("resizeStart", K, H(J))
                },
                resize: function (K, J) {
                    G._trigger("resize", K, H(J))
                },
                stop: function (K, J) {
                    D(this).removeClass("ui-dialog-resizing");
                    E.height = D(this).height();
                    E.width = D(this).width();
                    G._trigger("resizeStop", K, H(J));
                    D.ui.dialog.overlay.resize()
                }
            }).css("position", F).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
        }, _minHeight: function () {
            var E = this.options;
            return E.height === "auto" ? E.minHeight : Math.min(E.minHeight, E.height)
        }, _position: function (H) {
            var G = [], F = [0, 0], E;
            if (H) {
                if (typeof H === "string" || typeof H === "object" && "0" in H) {
                    G = H.split ? H.split(" ") : [H[0], H[1]];
                    if (G.length === 1) {
                        G[1] = G[0]
                    }
                    D.each(["left", "top"], function (I, J) {
                        if (+G[I] === G[I]) {
                            F[I] = G[I];
                            G[I] = J
                        }
                    });
                    H = {my: G.join(" "), at: G.join(" "), offset: F.join(" ")}
                }
                H = D.extend({}, D.ui.dialog.prototype.options.position, H)
            } else {
                H = D.ui.dialog.prototype.options.position
            }
            (E = this.uiDialog.is(":visible")) || this.uiDialog.show();
            this.uiDialog.css({top: 0, left: 0}).position(D.extend({of: window}, H));
            E || this.uiDialog.hide()
        }, _setOptions: function (H) {
            var G = this, F = {}, E = false;
            D.each(H, function (I, J) {
                G._setOption(I, J);
                if (I in C) {
                    E = true
                }
                if (I in A) {
                    F[I] = J
                }
            });
            E && this._size();
            this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", F)
        }, _setOption: function (I, H) {
            var G = this, E = G.uiDialog;
            switch (I) {
                case"beforeclose":
                    I = "beforeClose";
                    break;
                case"buttons":
                    G._createButtons(H);
                    break;
                case"closeText":
                    G.uiDialogTitlebarCloseText.text("" + H);
                    break;
                case"dialogClass":
                    E.removeClass(G.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " + H);
                    break;
                case"disabled":
                    H ? E.addClass("ui-dialog-disabled") : E.removeClass("ui-dialog-disabled");
                    break;
                case"draggable":
                    var F = E.is(":data(draggable)");
                    F && !H && E.draggable("destroy");
                    !F && H && G._makeDraggable();
                    break;
                case"position":
                    G._position(H);
                    break;
                case"resizable":
                    (F = E.is(":data(resizable)")) && !H && E.resizable("destroy");
                    F && typeof H === "string" && E.resizable("option", "handles", H);
                    !F && H !== false && G._makeResizable(H);
                    break;
                case"title":
                    D(".ui-dialog-title", G.uiDialogTitlebar).html("" + (H || "&#160;"));
                    break
            }
            D.Widget.prototype._setOption.apply(G, arguments)
        }, _size: function () {
            var H = this.options, G, F, E = this.uiDialog.is(":visible");
            this.element.show().css({width: "auto", minHeight: 0, height: 0});
            if (H.minWidth > H.width) {
                H.width = H.minWidth
            }
            G = this.uiDialog.css({height: "auto", width: H.width}).height();
            F = Math.max(0, H.minHeight - G);
            if (H.height === "auto") {
                if (D.support.minHeight) {
                    this.element.css({minHeight: F, height: "auto"})
                } else {
                    this.uiDialog.show();
                    H = this.element.css("height", "auto").height();
                    E || this.uiDialog.hide();
                    this.element.height(Math.max(H, F))
                }
            } else {
                this.element.height(Math.max(H.height - G, 0))
            }
            this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        }
    });
    D.extend(D.ui.dialog, {
        version: "1.8.11", uuid: 0, maxZ: 0, getTitleId: function (E) {
            E = E.attr("id");
            if (!E) {
                this.uuid += 1;
                E = this.uuid
            }
            return "ui-dialog-title-" + E
        }, overlay: function (E) {
            this.$el = D.ui.dialog.overlay.create(E)
        }
    });
    D.extend(D.ui.dialog.overlay, {
        instances: [],
        oldInstances: [],
        maxZ: 0,
        events: D.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function (E) {
            return E + ".dialog-overlay"
        }).join(" "),
        create: function (F) {
            if (this.instances.length === 0) {
                setTimeout(function () {
                    D.ui.dialog.overlay.instances.length && D(document).bind(D.ui.dialog.overlay.events, function (G) {
                        if (D(G.target).zIndex() < D.ui.dialog.overlay.maxZ) {
                            return false
                        }
                    })
                }, 1);
                D(document).bind("keydown.dialog-overlay", function (G) {
                    if (F.options.closeOnEscape && G.keyCode && G.keyCode === D.ui.keyCode.ESCAPE) {
                        F.close(G);
                        G.preventDefault()
                    }
                });
                D(window).bind("resize.dialog-overlay", D.ui.dialog.overlay.resize)
            }
            var E = (this.oldInstances.pop() || D("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
                width: this.width(),
                height: this.height()
            });
            D.fn.bgiframe && E.bgiframe();
            this.instances.push(E);
            return E
        },
        destroy: function (G) {
            var F = D.inArray(G, this.instances);
            F != -1 && this.oldInstances.push(this.instances.splice(F, 1)[0]);
            this.instances.length === 0 && D([document, window]).unbind(".dialog-overlay");
            G.remove();
            var E = 0;
            D.each(this.instances, function () {
                E = Math.max(E, this.css("z-index"))
            });
            this.maxZ = E
        },
        height: function () {
            var F, E;
            if (D.browser.msie && D.browser.version < 7) {
                F = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                E = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
                return F < E ? D(window).height() + "px" : F + "px"
            } else {
                return D(document).height() + "px"
            }
        },
        width: function () {
            var F, E;
            if (D.browser.msie && D.browser.version < 7) {
                F = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
                E = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                return F < E ? D(window).width() + "px" : F + "px"
            } else {
                return D(document).width() + "px"
            }
        },
        resize: function () {
            var E = D([]);
            D.each(D.ui.dialog.overlay.instances, function () {
                E = E.add(this)
            });
            E.css({width: 0, height: 0}).css({width: D.ui.dialog.overlay.width(), height: D.ui.dialog.overlay.height()})
        }
    });
    D.extend(D.ui.dialog.overlay.prototype, {
        destroy: function () {
            D.ui.dialog.overlay.destroy(this.$el)
        }
    })
})(jQuery);
(function (D) {
    D.ui = D.ui || {};
    var B = /left|center|right/, C = /top|center|bottom/, A = D.fn.position, E = D.fn.offset;
    D.fn.position = function (M) {
        if (!M || !M.of) {
            return A.apply(this, arguments)
        }
        M = D.extend({}, M);
        var L = D(M.of), H = L[0], I = (M.collision || "flip").split(" "), G = M.offset ? M.offset.split(" ") : [0, 0], J, F, K;
        if (H.nodeType === 9) {
            J = L.width();
            F = L.height();
            K = {top: 0, left: 0}
        } else {
            if (H.setTimeout) {
                J = L.width();
                F = L.height();
                K = {top: L.scrollTop(), left: L.scrollLeft()}
            } else {
                if (H.preventDefault) {
                    M.at = "left top";
                    J = F = 0;
                    K = {top: M.of.pageY, left: M.of.pageX}
                } else {
                    J = L.outerWidth();
                    F = L.outerHeight();
                    K = L.offset()
                }
            }
        }
        D.each(["my", "at"], function () {
            var N = (M[this] || "").split(" ");
            if (N.length === 1) {
                N = B.test(N[0]) ? N.concat(["center"]) : C.test(N[0]) ? ["center"].concat(N) : ["center", "center"]
            }
            N[0] = B.test(N[0]) ? N[0] : "center";
            N[1] = C.test(N[1]) ? N[1] : "center";
            M[this] = N
        });
        if (I.length === 1) {
            I[1] = I[0]
        }
        G[0] = parseInt(G[0], 10) || 0;
        if (G.length === 1) {
            G[1] = G[0]
        }
        G[1] = parseInt(G[1], 10) || 0;
        if (M.at[0] === "right") {
            K.left += J
        } else {
            if (M.at[0] === "center") {
                K.left += J / 2
            }
        }
        if (M.at[1] === "bottom") {
            K.top += F
        } else {
            if (M.at[1] === "center") {
                K.top += F / 2
            }
        }
        K.left += G[0];
        K.top += G[1];
        return this.each(function () {
            var T = D(this), V = T.outerWidth(), U = T.outerHeight(), P = parseInt(D.curCSS(this, "marginLeft", true)) || 0, O = parseInt(D.curCSS(this, "marginTop", true)) || 0, N = V + P + (parseInt(D.curCSS(this, "marginRight", true)) || 0), S = U + O + (parseInt(D.curCSS(this, "marginBottom", true)) || 0), Q = D.extend({}, K), R;
            if (M.my[0] === "right") {
                Q.left -= V
            } else {
                if (M.my[0] === "center") {
                    Q.left -= V / 2
                }
            }
            if (M.my[1] === "bottom") {
                Q.top -= U
            } else {
                if (M.my[1] === "center") {
                    Q.top -= U / 2
                }
            }
            Q.left = Math.round(Q.left);
            Q.top = Math.round(Q.top);
            R = {left: Q.left - P, top: Q.top - O};
            D.each(["left", "top"], function (X, W) {
                D.ui.position[I[X]] && D.ui.position[I[X]][W](Q, {
                    targetWidth: J,
                    targetHeight: F,
                    elemWidth: V,
                    elemHeight: U,
                    collisionPosition: R,
                    collisionWidth: N,
                    collisionHeight: S,
                    offset: G,
                    my: M.my,
                    at: M.at
                })
            });
            D.fn.bgiframe && T.bgiframe();
            T.offset(D.extend(Q, {using: M.using}))
        })
    };
    D.ui.position = {
        fit: {
            left: function (H, G) {
                var F = D(window);
                F = G.collisionPosition.left + G.collisionWidth - F.width() - F.scrollLeft();
                H.left = F > 0 ? H.left - F : Math.max(H.left - G.collisionPosition.left, H.left)
            }, top: function (H, G) {
                var F = D(window);
                F = G.collisionPosition.top + G.collisionHeight - F.height() - F.scrollTop();
                H.top = F > 0 ? H.top - F : Math.max(H.top - G.collisionPosition.top, H.top)
            }
        }, flip: {
            left: function (J, I) {
                if (I.at[0] !== "center") {
                    var F = D(window);
                    F = I.collisionPosition.left + I.collisionWidth - F.width() - F.scrollLeft();
                    var G = I.my[0] === "left" ? -I.elemWidth : I.my[0] === "right" ? I.elemWidth : 0, K = I.at[0] === "left" ? I.targetWidth : -I.targetWidth, H = -2 * I.offset[0];
                    J.left += I.collisionPosition.left < 0 ? G + K + H : F > 0 ? G + K + H : 0
                }
            }, top: function (J, I) {
                if (I.at[1] !== "center") {
                    var F = D(window);
                    F = I.collisionPosition.top + I.collisionHeight - F.height() - F.scrollTop();
                    var G = I.my[1] === "top" ? -I.elemHeight : I.my[1] === "bottom" ? I.elemHeight : 0, K = I.at[1] === "top" ? I.targetHeight : -I.targetHeight, H = -2 * I.offset[1];
                    J.top += I.collisionPosition.top < 0 ? G + K + H : F > 0 ? G + K + H : 0
                }
            }
        }
    };
    if (!D.offset.setOffset) {
        D.offset.setOffset = function (J, I) {
            if (/static/.test(D.curCSS(J, "position"))) {
                J.style.position = "relative"
            }
            var F = D(J), G = F.offset(), K = parseInt(D.curCSS(J, "top", true), 10) || 0, H = parseInt(D.curCSS(J, "left", true), 10) || 0;
            G = {top: I.top - G.top + K, left: I.left - G.left + H};
            "using" in I ? I.using.call(J, G) : F.css(G)
        };
        D.fn.offset = function (G) {
            var F = this[0];
            if (!F || !F.ownerDocument) {
                return null
            }
            if (G) {
                return this.each(function () {
                    D.offset.setOffset(this, G)
                })
            }
            return E.call(this)
        }
    }
})(jQuery);
(function (B, A) {
    B.widget("ui.progressbar", {
        options: {value: 0, max: 100}, min: 0, _create: function () {
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._value()
            });
            this.valueDiv = B("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element);
            this.oldValue = this._value();
            this._refreshValue()
        }, destroy: function () {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.valueDiv.remove();
            B.Widget.prototype.destroy.apply(this, arguments)
        }, value: function (C) {
            if (C === A) {
                return this._value()
            }
            this._setOption("value", C);
            return this
        }, _setOption: function (D, C) {
            if (D === "value") {
                this.options.value = C;
                this._refreshValue();
                this._value() === this.options.max && this._trigger("complete")
            }
            B.Widget.prototype._setOption.apply(this, arguments)
        }, _value: function () {
            var C = this.options.value;
            if (typeof C !== "number") {
                C = 0
            }
            return Math.min(this.options.max, Math.max(this.min, C))
        }, _percentage: function () {
            return 100 * this._value() / this.options.max
        }, _refreshValue: function () {
            var D = this.value(), C = this._percentage();
            if (this.oldValue !== D) {
                this.oldValue = D;
                this._trigger("change")
            }
            this.valueDiv.toggleClass("ui-corner-right", D === this.options.max).width(C.toFixed(0) + "%");
            this.element.attr("aria-valuenow", D)
        }
    });
    B.extend(B.ui.progressbar, {version: "1.8.11"})
})(jQuery);
(function (A) {
    A.widget("ui.slider", A.ui.mouse, {
        widgetEventPrefix: "slide",
        options: {
            animate: false,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: false,
            step: 1,
            value: 0,
            values: null
        },
        _create: function () {
            var B = this, C = this.options;
            this._mouseSliding = this._keySliding = false;
            this._animateOff = true;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
            C.disabled && this.element.addClass("ui-slider-disabled ui-disabled");
            this.range = A([]);
            if (C.range) {
                if (C.range === true) {
                    this.range = A("<div></div>");
                    if (!C.values) {
                        C.values = [this._valueMin(), this._valueMin()]
                    }
                    if (C.values.length && C.values.length !== 2) {
                        C.values = [C.values[0], C.values[0]]
                    }
                } else {
                    this.range = A("<div></div>")
                }
                this.range.appendTo(this.element).addClass("ui-slider-range");
                if (C.range === "min" || C.range === "max") {
                    this.range.addClass("ui-slider-range-" + C.range)
                }
                this.range.addClass("ui-widget-header")
            }
            A(".ui-slider-handle", this.element).length === 0 && A("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle");
            if (C.values && C.values.length) {
                for (; A(".ui-slider-handle", this.element).length < C.values.length;) {
                    A("<a href='#'></a>").appendTo(this.element).addClass("ui-slider-handle")
                }
            }
            this.handles = A(".ui-slider-handle", this.element).addClass("ui-state-default ui-corner-all");
            this.handle = this.handles.eq(0);
            this.handles.add(this.range).filter("a").click(function (D) {
                D.preventDefault()
            }).hover(function () {
                C.disabled || A(this).addClass("ui-state-hover")
            }, function () {
                A(this).removeClass("ui-state-hover")
            }).focus(function () {
                if (C.disabled) {
                    A(this).blur()
                } else {
                    A(".ui-slider .ui-state-focus").removeClass("ui-state-focus");
                    A(this).addClass("ui-state-focus")
                }
            }).blur(function () {
                A(this).removeClass("ui-state-focus")
            });
            this.handles.each(function (D) {
                A(this).data("index.ui-slider-handle", D)
            });
            this.handles.keydown(function (D) {
                var I = true, H = A(this).data("index.ui-slider-handle"), G, E, F;
                if (!B.options.disabled) {
                    switch (D.keyCode) {
                        case A.ui.keyCode.HOME:
                        case A.ui.keyCode.END:
                        case A.ui.keyCode.PAGE_UP:
                        case A.ui.keyCode.PAGE_DOWN:
                        case A.ui.keyCode.UP:
                        case A.ui.keyCode.RIGHT:
                        case A.ui.keyCode.DOWN:
                        case A.ui.keyCode.LEFT:
                            I = false;
                            if (!B._keySliding) {
                                B._keySliding = true;
                                A(this).addClass("ui-state-active");
                                G = B._start(D, H);
                                if (G === false) {
                                    return
                                }
                            }
                            break
                    }
                    F = B.options.step;
                    G = B.options.values && B.options.values.length ? (E = B.values(H)) : (E = B.value());
                    switch (D.keyCode) {
                        case A.ui.keyCode.HOME:
                            E = B._valueMin();
                            break;
                        case A.ui.keyCode.END:
                            E = B._valueMax();
                            break;
                        case A.ui.keyCode.PAGE_UP:
                            E = B._trimAlignValue(G + (B._valueMax() - B._valueMin()) / 5);
                            break;
                        case A.ui.keyCode.PAGE_DOWN:
                            E = B._trimAlignValue(G - (B._valueMax() - B._valueMin()) / 5);
                            break;
                        case A.ui.keyCode.UP:
                        case A.ui.keyCode.RIGHT:
                            if (G === B._valueMax()) {
                                return
                            }
                            E = B._trimAlignValue(G + F);
                            break;
                        case A.ui.keyCode.DOWN:
                        case A.ui.keyCode.LEFT:
                            if (G === B._valueMin()) {
                                return
                            }
                            E = B._trimAlignValue(G - F);
                            break
                    }
                    B._slide(D, H, E);
                    return I
                }
            }).keyup(function (D) {
                var E = A(this).data("index.ui-slider-handle");
                if (B._keySliding) {
                    B._keySliding = false;
                    B._stop(D, E);
                    B._change(D, E);
                    A(this).removeClass("ui-state-active")
                }
            });
            this._refreshValue();
            this._animateOff = false
        },
        destroy: function () {
            this.handles.remove();
            this.range.remove();
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");
            this._mouseDestroy();
            return this
        },
        _mouseCapture: function (C) {
            var D = this.options, B, H, G, F, E;
            if (D.disabled) {
                return false
            }
            this.elementSize = {width: this.element.outerWidth(), height: this.element.outerHeight()};
            this.elementOffset = this.element.offset();
            B = this._normValueFromMouse({x: C.pageX, y: C.pageY});
            H = this._valueMax() - this._valueMin() + 1;
            F = this;
            this.handles.each(function (I) {
                var J = Math.abs(B - F.values(I));
                if (H > J) {
                    H = J;
                    G = A(this);
                    E = I
                }
            });
            if (D.range === true && this.values(1) === D.min) {
                E += 1;
                G = A(this.handles[E])
            }
            if (this._start(C, E) === false) {
                return false
            }
            this._mouseSliding = true;
            F._handleIndex = E;
            G.addClass("ui-state-active").focus();
            D = G.offset();
            this._clickOffset = !A(C.target).parents().andSelf().is(".ui-slider-handle") ? {
                left: 0,
                top: 0
            } : {
                left: C.pageX - D.left - G.width() / 2,
                top: C.pageY - D.top - G.height() / 2 - (parseInt(G.css("borderTopWidth"), 10) || 0) - (parseInt(G.css("borderBottomWidth"), 10) || 0) + (parseInt(G.css("marginTop"), 10) || 0)
            };
            this.handles.hasClass("ui-state-hover") || this._slide(C, E, B);
            return this._animateOff = true
        },
        _mouseStart: function () {
            return true
        },
        _mouseDrag: function (B) {
            var C = this._normValueFromMouse({x: B.pageX, y: B.pageY});
            this._slide(B, this._handleIndex, C);
            return false
        },
        _mouseStop: function (B) {
            this.handles.removeClass("ui-state-active");
            this._mouseSliding = false;
            this._stop(B, this._handleIndex);
            this._change(B, this._handleIndex);
            this._clickOffset = this._handleIndex = null;
            return this._animateOff = false
        },
        _detectOrientation: function () {
            this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function (B) {
            var C;
            if (this.orientation === "horizontal") {
                C = this.elementSize.width;
                B = B.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)
            } else {
                C = this.elementSize.height;
                B = B.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)
            }
            C = B / C;
            if (C > 1) {
                C = 1
            }
            if (C < 0) {
                C = 0
            }
            if (this.orientation === "vertical") {
                C = 1 - C
            }
            B = this._valueMax() - this._valueMin();
            return this._trimAlignValue(this._valueMin() + C * B)
        },
        _start: function (C, D) {
            var B = {handle: this.handles[D], value: this.value()};
            if (this.options.values && this.options.values.length) {
                B.value = this.values(D);
                B.values = this.values()
            }
            return this._trigger("start", C, B)
        },
        _slide: function (C, D, B) {
            var E;
            if (this.options.values && this.options.values.length) {
                E = this.values(D ? 0 : 1);
                if (this.options.values.length === 2 && this.options.range === true && (D === 0 && B > E || D === 1 && B < E)) {
                    B = E
                }
                if (B !== this.values(D)) {
                    E = this.values();
                    E[D] = B;
                    C = this._trigger("slide", C, {handle: this.handles[D], value: B, values: E});
                    this.values(D ? 0 : 1);
                    C !== false && this.values(D, B, true)
                }
            } else {
                if (B !== this.value()) {
                    C = this._trigger("slide", C, {handle: this.handles[D], value: B});
                    C !== false && this.value(B)
                }
            }
        },
        _stop: function (C, D) {
            var B = {handle: this.handles[D], value: this.value()};
            if (this.options.values && this.options.values.length) {
                B.value = this.values(D);
                B.values = this.values()
            }
            this._trigger("stop", C, B)
        },
        _change: function (C, D) {
            if (!this._keySliding && !this._mouseSliding) {
                var B = {handle: this.handles[D], value: this.value()};
                if (this.options.values && this.options.values.length) {
                    B.value = this.values(D);
                    B.values = this.values()
                }
                this._trigger("change", C, B)
            }
        },
        value: function (B) {
            if (arguments.length) {
                this.options.value = this._trimAlignValue(B);
                this._refreshValue();
                this._change(null, 0)
            }
            return this._value()
        },
        values: function (C, D) {
            var B, F, E;
            if (arguments.length > 1) {
                this.options.values[C] = this._trimAlignValue(D);
                this._refreshValue();
                this._change(null, C)
            }
            if (arguments.length) {
                if (A.isArray(arguments[0])) {
                    B = this.options.values;
                    F = arguments[0];
                    for (E = 0; E < B.length; E += 1) {
                        B[E] = this._trimAlignValue(F[E]);
                        this._change(null, E)
                    }
                    this._refreshValue()
                } else {
                    return this.options.values && this.options.values.length ? this._values(C) : this.value()
                }
            } else {
                return this._values()
            }
        },
        _setOption: function (C, D) {
            var B, E = 0;
            if (A.isArray(this.options.values)) {
                E = this.options.values.length
            }
            A.Widget.prototype._setOption.apply(this, arguments);
            switch (C) {
                case"disabled":
                    if (D) {
                        this.handles.filter(".ui-state-focus").blur();
                        this.handles.removeClass("ui-state-hover");
                        this.handles.attr("disabled", "disabled");
                        this.element.addClass("ui-disabled")
                    } else {
                        this.handles.removeAttr("disabled");
                        this.element.removeClass("ui-disabled")
                    }
                    break;
                case"orientation":
                    this._detectOrientation();
                    this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                    this._refreshValue();
                    break;
                case"value":
                    this._animateOff = true;
                    this._refreshValue();
                    this._change(null, 0);
                    this._animateOff = false;
                    break;
                case"values":
                    this._animateOff = true;
                    this._refreshValue();
                    for (B = 0; B < E; B += 1) {
                        this._change(null, B)
                    }
                    this._animateOff = false;
                    break
            }
        },
        _value: function () {
            var B = this.options.value;
            return B = this._trimAlignValue(B)
        },
        _values: function (C) {
            var D, B;
            if (arguments.length) {
                D = this.options.values[C];
                return D = this._trimAlignValue(D)
            } else {
                D = this.options.values.slice();
                for (B = 0; B < D.length; B += 1) {
                    D[B] = this._trimAlignValue(D[B])
                }
                return D
            }
        },
        _trimAlignValue: function (C) {
            if (C <= this._valueMin()) {
                return this._valueMin()
            }
            if (C >= this._valueMax()) {
                return this._valueMax()
            }
            var D = this.options.step > 0 ? this.options.step : 1, B = (C - this._valueMin()) % D;
            alignValue = C - B;
            if (Math.abs(B) * 2 >= D) {
                alignValue += B > 0 ? D : -D
            }
            return parseFloat(alignValue.toFixed(5))
        },
        _valueMin: function () {
            return this.options.min
        },
        _valueMax: function () {
            return this.options.max
        },
        _refreshValue: function () {
            var K = this.options.range, B = this.options, J = this, I = !this._animateOff ? B.animate : false, H, G = {}, D, E, C, F;
            if (this.options.values && this.options.values.length) {
                this.handles.each(function (L) {
                    H = (J.values(L) - J._valueMin()) / (J._valueMax() - J._valueMin()) * 100;
                    G[J.orientation === "horizontal" ? "left" : "bottom"] = H + "%";
                    A(this).stop(1, 1)[I ? "animate" : "css"](G, B.animate);
                    if (J.options.range === true) {
                        if (J.orientation === "horizontal") {
                            if (L === 0) {
                                J.range.stop(1, 1)[I ? "animate" : "css"]({left: H + "%"}, B.animate)
                            }
                            if (L === 1) {
                                J.range[I ? "animate" : "css"]({width: H - D + "%"}, {
                                    queue: false,
                                    duration: B.animate
                                })
                            }
                        } else {
                            if (L === 0) {
                                J.range.stop(1, 1)[I ? "animate" : "css"]({bottom: H + "%"}, B.animate)
                            }
                            if (L === 1) {
                                J.range[I ? "animate" : "css"]({height: H - D + "%"}, {
                                    queue: false,
                                    duration: B.animate
                                })
                            }
                        }
                    }
                    D = H
                })
            } else {
                E = this.value();
                C = this._valueMin();
                F = this._valueMax();
                H = F !== C ? (E - C) / (F - C) * 100 : 0;
                G[J.orientation === "horizontal" ? "left" : "bottom"] = H + "%";
                this.handle.stop(1, 1)[I ? "animate" : "css"](G, B.animate);
                if (K === "min" && this.orientation === "horizontal") {
                    this.range.stop(1, 1)[I ? "animate" : "css"]({width: H + "%"}, B.animate)
                }
                if (K === "max" && this.orientation === "horizontal") {
                    this.range[I ? "animate" : "css"]({width: 100 - H + "%"}, {queue: false, duration: B.animate})
                }
                if (K === "min" && this.orientation === "vertical") {
                    this.range.stop(1, 1)[I ? "animate" : "css"]({height: H + "%"}, B.animate)
                }
                if (K === "max" && this.orientation === "vertical") {
                    this.range[I ? "animate" : "css"]({height: 100 - H + "%"}, {queue: false, duration: B.animate})
                }
            }
        }
    });
    A.extend(A.ui.slider, {version: "1.8.11"})
})(jQuery);
(function (D, B) {
    function C() {
        return ++F
    }

    function A() {
        return ++E
    }

    var F = 0, E = 0;
    D.widget("ui.tabs", {
        options: {
            add: null,
            ajaxOptions: null,
            cache: false,
            cookie: null,
            collapsible: false,
            disable: null,
            disabled: [],
            enable: null,
            event: "click",
            fx: null,
            idPrefix: "ui-tabs-",
            load: null,
            panelTemplate: "<div></div>",
            remove: null,
            select: null,
            show: null,
            spinner: "<em>Loading&#8230;</em>",
            tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
        }, _create: function () {
            this._tabify(true)
        }, _setOption: function (H, G) {
            if (H == "selected") {
                this.options.collapsible && G == this.options.selected || this.select(G)
            } else {
                this.options[H] = G;
                this._tabify()
            }
        }, _tabId: function (G) {
            return G.title && G.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + C()
        }, _sanitizeSelector: function (G) {
            return G.replace(/:/g, "\\:")
        }, _cookie: function () {
            var G = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + A());
            return D.cookie.apply(null, [G].concat(D.makeArray(arguments)))
        }, _ui: function (H, G) {
            return {tab: H, panel: G, index: this.anchors.index(H)}
        }, _cleanup: function () {
            this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function () {
                var G = D(this);
                G.html(G.data("label.tabs")).removeData("label.tabs")
            })
        }, _tabify: function (R) {
            function L(S, T) {
                S.css("display", "");
                !D.support.opacity && T.opacity && S[0].style.removeAttribute("filter")
            }

            var M = this, J = this.options, N = /^#.+/;
            this.list = this.element.find("ol,ul").eq(0);
            this.lis = D(" > li:has(a[href])", this.list);
            this.anchors = this.lis.map(function () {
                return D("a", this)[0]
            });
            this.panels = D([]);
            this.anchors.each(function (S, W) {
                var T = D(W).attr("href"), U = T.split("#")[0], V;
                if (U && (U === location.toString().split("#")[0] || (V = D("base")[0]) && U === V.href)) {
                    T = W.hash;
                    W.href = T
                }
                if (N.test(T)) {
                    M.panels = M.panels.add(M.element.find(M._sanitizeSelector(T)))
                } else {
                    if (T && T !== "#") {
                        D.data(W, "href.tabs", T);
                        D.data(W, "load.tabs", T.replace(/#.*$/, ""));
                        T = M._tabId(W);
                        W.href = "#" + T;
                        W = M.element.find("#" + T);
                        if (!W.length) {
                            W = D(J.panelTemplate).attr("id", T).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(M.panels[S - 1] || M.list);
                            W.data("destroy.tabs", true)
                        }
                        M.panels = M.panels.add(W)
                    } else {
                        J.disabled.push(S)
                    }
                }
            });
            if (R) {
                this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
                this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
                this.lis.addClass("ui-state-default ui-corner-top");
                this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
                if (J.selected === B) {
                    location.hash && this.anchors.each(function (S, T) {
                        if (T.hash == location.hash) {
                            J.selected = S;
                            return false
                        }
                    });
                    if (typeof J.selected !== "number" && J.cookie) {
                        J.selected = parseInt(M._cookie(), 10)
                    }
                    if (typeof J.selected !== "number" && this.lis.filter(".ui-tabs-selected").length) {
                        J.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))
                    }
                    J.selected = J.selected || (this.lis.length ? 0 : -1)
                } else {
                    if (J.selected === null) {
                        J.selected = -1
                    }
                }
                J.selected = J.selected >= 0 && this.anchors[J.selected] || J.selected < 0 ? J.selected : 0;
                J.disabled = D.unique(J.disabled.concat(D.map(this.lis.filter(".ui-state-disabled"), function (S) {
                    return M.lis.index(S)
                }))).sort();
                D.inArray(J.selected, J.disabled) != -1 && J.disabled.splice(D.inArray(J.selected, J.disabled), 1);
                this.panels.addClass("ui-tabs-hide");
                this.lis.removeClass("ui-tabs-selected ui-state-active");
                if (J.selected >= 0 && this.anchors.length) {
                    M.element.find(M._sanitizeSelector(M.anchors[J.selected].hash)).removeClass("ui-tabs-hide");
                    this.lis.eq(J.selected).addClass("ui-tabs-selected ui-state-active");
                    M.element.queue("tabs", function () {
                        M._trigger("show", null, M._ui(M.anchors[J.selected], M.element.find(M._sanitizeSelector(M.anchors[J.selected].hash))[0]))
                    });
                    this.load(J.selected)
                }
                D(window).bind("unload", function () {
                    M.lis.add(M.anchors).unbind(".tabs");
                    M.lis = M.anchors = M.panels = null
                })
            } else {
                J.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))
            }
            this.element[J.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible");
            J.cookie && this._cookie(J.selected, J.cookie);
            R = 0;
            for (var H; H = this.lis[R]; R++) {
                D(H)[D.inArray(R, J.disabled) != -1 && !D(H).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled")
            }
            J.cache === false && this.anchors.removeData("cache.tabs");
            this.lis.add(this.anchors).unbind(".tabs");
            if (J.event !== "mouseover") {
                var P = function (S, T) {
                    T.is(":not(.ui-state-disabled)") && T.addClass("ui-state-" + S)
                }, K = function (S, T) {
                    T.removeClass("ui-state-" + S)
                };
                this.lis.bind("mouseover.tabs", function () {
                    P("hover", D(this))
                });
                this.lis.bind("mouseout.tabs", function () {
                    K("hover", D(this))
                });
                this.anchors.bind("focus.tabs", function () {
                    P("focus", D(this).closest("li"))
                });
                this.anchors.bind("blur.tabs", function () {
                    K("focus", D(this).closest("li"))
                })
            }
            var Q, O;
            if (J.fx) {
                if (D.isArray(J.fx)) {
                    Q = J.fx[0];
                    O = J.fx[1]
                } else {
                    Q = O = J.fx
                }
            }
            var I = O ? function (S, T) {
                D(S).closest("li").addClass("ui-tabs-selected ui-state-active");
                T.hide().removeClass("ui-tabs-hide").animate(O, O.duration || "normal", function () {
                    L(T, O);
                    M._trigger("show", null, M._ui(S, T[0]))
                })
            } : function (S, T) {
                D(S).closest("li").addClass("ui-tabs-selected ui-state-active");
                T.removeClass("ui-tabs-hide");
                M._trigger("show", null, M._ui(S, T[0]))
            }, G = Q ? function (S, T) {
                T.animate(Q, Q.duration || "normal", function () {
                    M.lis.removeClass("ui-tabs-selected ui-state-active");
                    T.addClass("ui-tabs-hide");
                    L(T, Q);
                    M.element.dequeue("tabs")
                })
            } : function (S, T) {
                M.lis.removeClass("ui-tabs-selected ui-state-active");
                T.addClass("ui-tabs-hide");
                M.element.dequeue("tabs")
            };
            this.anchors.bind(J.event + ".tabs", function () {
                var S = this, V = D(S).closest("li"), T = M.panels.filter(":not(.ui-tabs-hide)"), U = M.element.find(M._sanitizeSelector(S.hash));
                if (V.hasClass("ui-tabs-selected") && !J.collapsible || V.hasClass("ui-state-disabled") || V.hasClass("ui-state-processing") || M.panels.filter(":animated").length || M._trigger("select", null, M._ui(this, U[0])) === false) {
                    this.blur();
                    return false
                }
                J.selected = M.anchors.index(this);
                M.abort();
                if (J.collapsible) {
                    if (V.hasClass("ui-tabs-selected")) {
                        J.selected = -1;
                        J.cookie && M._cookie(J.selected, J.cookie);
                        M.element.queue("tabs", function () {
                            G(S, T)
                        }).dequeue("tabs");
                        this.blur();
                        return false
                    } else {
                        if (!T.length) {
                            J.cookie && M._cookie(J.selected, J.cookie);
                            M.element.queue("tabs", function () {
                                I(S, U)
                            });
                            M.load(M.anchors.index(this));
                            this.blur();
                            return false
                        }
                    }
                }
                J.cookie && M._cookie(J.selected, J.cookie);
                if (U.length) {
                    T.length && M.element.queue("tabs", function () {
                        G(S, T)
                    });
                    M.element.queue("tabs", function () {
                        I(S, U)
                    });
                    M.load(M.anchors.index(this))
                } else {
                    throw"jQuery UI Tabs: Mismatching fragment identifier."
                }
                D.browser.msie && this.blur()
            });
            this.anchors.bind("click.tabs", function () {
                return false
            })
        }, _getIndex: function (G) {
            if (typeof G == "string") {
                G = this.anchors.index(this.anchors.filter("[href$=" + G + "]"))
            }
            return G
        }, destroy: function () {
            var G = this.options;
            this.abort();
            this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
            this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
            this.anchors.each(function () {
                var H = D.data(this, "href.tabs");
                if (H) {
                    this.href = H
                }
                var I = D(this).unbind(".tabs");
                D.each(["href", "load", "cache"], function (K, J) {
                    I.removeData(J + ".tabs")
                })
            });
            this.lis.unbind(".tabs").add(this.panels).each(function () {
                D.data(this, "destroy.tabs") ? D(this).remove() : D(this).removeClass("ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover ui-state-focus ui-state-disabled ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide")
            });
            G.cookie && this._cookie(null, G.cookie);
            return this
        }, add: function (K, G, H) {
            if (H === B) {
                H = this.anchors.length
            }
            var L = this, I = this.options;
            G = D(I.tabTemplate.replace(/#\{href\}/g, K).replace(/#\{label\}/g, G));
            K = !K.indexOf("#") ? K.replace("#", "") : this._tabId(D("a", G)[0]);
            G.addClass("ui-state-default ui-corner-top").data("destroy.tabs", true);
            var J = L.element.find("#" + K);
            J.length || (J = D(I.panelTemplate).attr("id", K).data("destroy.tabs", true));
            J.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
            if (H >= this.lis.length) {
                G.appendTo(this.list);
                J.appendTo(this.list[0].parentNode)
            } else {
                G.insertBefore(this.lis[H]);
                J.insertBefore(this.panels[H])
            }
            I.disabled = D.map(I.disabled, function (M) {
                return M >= H ? ++M : M
            });
            this._tabify();
            if (this.anchors.length == 1) {
                I.selected = 0;
                G.addClass("ui-tabs-selected ui-state-active");
                J.removeClass("ui-tabs-hide");
                this.element.queue("tabs", function () {
                    L._trigger("show", null, L._ui(L.anchors[0], L.panels[0]))
                });
                this.load(0)
            }
            this._trigger("add", null, this._ui(this.anchors[H], this.panels[H]));
            return this
        }, remove: function (I) {
            I = this._getIndex(I);
            var G = this.options, H = this.lis.eq(I).remove(), J = this.panels.eq(I).remove();
            if (H.hasClass("ui-tabs-selected") && this.anchors.length > 1) {
                this.select(I + (I + 1 < this.anchors.length ? 1 : -1))
            }
            G.disabled = D.map(D.grep(G.disabled, function (K) {
                return K != I
            }), function (K) {
                return K >= I ? --K : K
            });
            this._tabify();
            this._trigger("remove", null, this._ui(H.find("a")[0], J[0]));
            return this
        }, enable: function (H) {
            H = this._getIndex(H);
            var G = this.options;
            if (D.inArray(H, G.disabled) != -1) {
                this.lis.eq(H).removeClass("ui-state-disabled");
                G.disabled = D.grep(G.disabled, function (I) {
                    return I != H
                });
                this._trigger("enable", null, this._ui(this.anchors[H], this.panels[H]));
                return this
            }
        }, disable: function (H) {
            H = this._getIndex(H);
            var G = this.options;
            if (H != G.selected) {
                this.lis.eq(H).addClass("ui-state-disabled");
                G.disabled.push(H);
                G.disabled.sort();
                this._trigger("disable", null, this._ui(this.anchors[H], this.panels[H]))
            }
            return this
        }, select: function (G) {
            G = this._getIndex(G);
            if (G == -1) {
                if (this.options.collapsible && this.options.selected != -1) {
                    G = this.options.selected
                } else {
                    return this
                }
            }
            this.anchors.eq(G).trigger(this.options.event + ".tabs");
            return this
        }, load: function (K) {
            K = this._getIndex(K);
            var G = this, H = this.options, L = this.anchors.eq(K)[0], I = D.data(L, "load.tabs");
            this.abort();
            if (!I || this.element.queue("tabs").length !== 0 && D.data(L, "cache.tabs")) {
                this.element.dequeue("tabs")
            } else {
                this.lis.eq(K).addClass("ui-state-processing");
                if (H.spinner) {
                    var J = D("span", L);
                    J.data("label.tabs", J.html()).html(H.spinner)
                }
                this.xhr = D.ajax(D.extend({}, H.ajaxOptions, {
                    url: I, success: function (M, O) {
                        G.element.find(G._sanitizeSelector(L.hash)).html(M);
                        G._cleanup();
                        H.cache && D.data(L, "cache.tabs", true);
                        G._trigger("load", null, G._ui(G.anchors[K], G.panels[K]));
                        try {
                            H.ajaxOptions.success(M, O)
                        } catch (N) {
                        }
                    }, error: function (M, O) {
                        G._cleanup();
                        G._trigger("load", null, G._ui(G.anchors[K], G.panels[K]));
                        try {
                            H.ajaxOptions.error(M, O, K, L)
                        } catch (N) {
                        }
                    }
                }));
                G.element.dequeue("tabs");
                return this
            }
        }, abort: function () {
            this.element.queue([]);
            this.panels.stop(false, true);
            this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2));
            if (this.xhr) {
                this.xhr.abort();
                delete this.xhr
            }
            this._cleanup();
            return this
        }, url: function (H, G) {
            this.anchors.eq(H).removeData("cache.tabs").data("load.tabs", G);
            return this
        }, length: function () {
            return this.anchors.length
        }
    });
    D.extend(D.ui.tabs, {version: "1.8.11"});
    D.extend(D.ui.tabs.prototype, {
        rotation: null, rotate: function (J, G) {
            var H = this, K = this.options, I = H._rotate || (H._rotate = function (L) {
                    clearTimeout(H.rotation);
                    H.rotation = setTimeout(function () {
                        var M = K.selected;
                        H.select(++M < H.anchors.length ? M : 0)
                    }, J);
                    L && L.stopPropagation()
                });
            G = H._unrotate || (H._unrotate = !G ? function (L) {
                    L.clientX && H.rotate(null)
                } : function () {
                    t = K.selected;
                    I()
                });
            if (J) {
                this.element.bind("tabsshow", I);
                this.anchors.bind(K.event + ".tabs", G);
                I()
            } else {
                clearTimeout(H.rotation);
                this.element.unbind("tabsshow", I);
                this.anchors.unbind(K.event + ".tabs", G);
                delete this._rotate;
                delete this._unrotate
            }
            return this
        }
    })
})(jQuery);
(function (E) {
    if (!E) {
        return
    }
    E.ajax_upload = function (B, A) {
        B = E(B);
        if (B.size() != 1) {
            console.error("You passed ", B.size(), " elements to ajax_upload at once");
            return false
        }
        return new F(B, A)
    };
    var D = function () {
        var A = 0;
        return function () {
            return A++
        }
    }();
    var F = function (B, A) {
        this.button = B;
        this.wrapper = null;
        this.form = null;
        this.input = null;
        this.iframe = null;
        this.disabled = false;
        this.submitting = false;
        this.settings = {
            action: "upload.php", name: "userfile", data: {}, onSubmit: function (C, H) {
            }, onComplete: function (H, C) {
            }, onSuccess: function (C) {
            }, onError: function (H, C) {
            }
        };
        E.extend(this.settings, A);
        this.create_wrapper();
        this.create_input();
        if (jQuery.browser.msie) {
            this.make_parent_opaque()
        }
        this.create_iframe()
    };
    F.prototype = {
        set_data: function (A) {
            this.settings.data = A
        }, disable: function () {
            this.disabled = true;
            if (!this.submitting) {
                this.input.attr("disabled", true)
            }
        }, enable: function () {
            this.disabled = false;
            this.input.attr("disabled", false)
        }, create_wrapper: function () {
            var C = this.button, A;
            A = this.wrapper = E("<div></div>").insertAfter(C).append(C);
            setTimeout(function () {
                A.css({position: "relative", display: "block", overflow: "hidden", width: C.outerWidth(true)})
            }, 1);
            var B = this;
            A.mousemove(function (H) {
                if (!B.input) {
                    return
                }
                B.input.css({top: H.pageY - A.offset().top - 5 + "px", left: H.pageX - A.offset().left - 170 + "px"})
            })
        }, create_input: function () {
            var A = this;
            this.input = E('<input tabIndex="-1" type="file" />').attr("name", this.settings.name).css({
                position: "absolute",
                margin: 0,
                padding: 0,
                width: "220px",
                heigth: "10px",
                opacity: 0
            }).change(function () {
                if (E(this).val() == "") {
                    return
                }
                A.submitting = true;
                A.submit();
                A.submitting = false
            }).appendTo(this.wrapper).hover(function () {
                A.button.addClass("hover")
            }, function () {
                A.button.removeClass("hover")
            });
            if (this.disabled) {
                this.input.attr("disabled", true)
            }
        }, create_iframe: function () {
            var A = "iframe_au" + D();
            this.iframe = E('<iframe name="' + A + '"></iframe>').css("display", "none").appendTo("body")
        }, submit: function () {
            var C = this, B = this.settings;
            var H = this.file_from_path(this.input.val());
            if (B.onSubmit.call(this, H, this.get_ext(H)) === false) {
                if (C.disabled) {
                    this.input.attr("disabled", true)
                }
                return
            }
            this.create_form();
            this.input.appendTo(this.form);
            this.form.submit();
            this.input.remove();
            this.input = null;
            this.form.remove();
            this.form = null;
            this.submitting = false;
            this.create_input();
            var A = this.iframe;
            A.load(function () {
                var G = A.contents().find("body").html();
                B.onComplete.call(C, H, G);
                if (G == "success") {
                    B.onSuccess.call(C, H)
                } else {
                    B.onError.call(C, H, G)
                }
                setTimeout(function () {
                    A.remove()
                }, 1)
            });
            this.create_iframe()
        }, create_form: function () {
            this.form = E('<form method="post" enctype="multipart/form-data"></form>').appendTo("body").attr({
                action: this.settings.action,
                target: this.iframe.attr("name")
            });
            for (var A in this.settings.data) {
                E('<input type="hidden" />').appendTo(this.form).attr({name: A, value: this.settings.data[A]})
            }
        }, file_from_path: function (B) {
            var A = B.lastIndexOf("\\");
            if (A !== -1) {
                return B.slice(A + 1)
            }
            return B
        }, get_ext: function (B) {
            var A = B.lastIndexOf(".");
            if (A !== -1) {
                return B.slice(A + 1)
            }
            return ""
        }, make_parent_opaque: function () {
            this.button.add(this.button.parents()).each(function () {
                var A = E(this).css("backgroundColor");
                var B = E(this).css("backgroundImage");
                if (A != "transparent" || B != "none") {
                    E(this).css("opacity", 1);
                    return false
                }
            })
        }
    }
})(jQuery);
$(window).ready(function () {
    //JS_PlaceHolder();
    //循环生成上传图片的热点
    $(".icross2").each(uploadStepImg);	    //2013-03-11
    //添加主料，用量栏目
    $("#zhuliao").click(function () {
        var html = addCaiLiaoInfo("zhuliao");
        $(this).parent().before(html);
    })
    // 添加标签框的选中事件
    $("#cooktagInput").click(function () {
        $(this).find('input').focus();
    })
    //添加辅料，用量栏目
    $("#fuliao").click(function () {
        var html = addCaiLiaoInfo("fuliao");
        $(this).parent().before(html);
    })
    //添加步骤图信息
    $("#addBuZhou").click(function () {
        //actionInputFile();
        var html = addBuZhou();
        $("#phonetic1").append(html);
        resortStepPosition();
        var obj = $("#phonetic1 li:last-child").children().children("div:first");
        uploadStepImgOne(obj);
    })
    //向上一步
    $(".ic_up").live('click', function () {
        var curStep = $(this).parents("li:first");
        var prevStep = curStep.prev();
        var nextStep = curStep.next();
        var curStepNum = curStep.find('.umber').text();
        if (curStepNum > 1) {
            curStep.insertBefore(prevStep);
            resortStepPosition();
        }
    })
    //向下一步
    $(".ic_dw").live('click', function () {
        var curStep = $(this).parents("li:first");
        var prevStep = curStep.prev();
        var nextStep = curStep.next();
        if ($('li.nsetp').index($(this).parents('li.nsetp')) != $('li.nsetp').size() - 1) {
            curStep.insertAfter(nextStep);
            resortStepPosition();
        }
    })
    //添加一步
    $(".ic_ad").live('click', function () {
        //actionInputFile();
        var html = addBuZhou();
        $(this).parents("li:first").after(html);
        resortStepPosition();
        var obj = $(this).parents("li:first").next().children().children("div:first");
        uploadStepImgOne(obj);
    })
    //删除主料，辅料信息。
    $(".wrng").live("click", function () {
        $(this).parent().remove();
    })
    //删除详细步骤信息。
    $(".ic_close").live("click", function () {
        var steplen = ($(".nsetp").length);
        if (steplen > 1) {
            $(this).parents("li:first").remove();
            resortStepPosition();
        }
    })
    //显示，隐藏详细步骤信息操作。
    $(".nsetp").live("mouseover mouseout", function (event) {
        if (event.type == "mouseout") {
            $(this).children('.sxgj').addClass("hidden");
        } else {
            $(this).children('.sxgj').removeClass("hidden");
        }
    })

    /**
     * @desc: 上传菜谱成品图
     * @return: json
     **/
    $.ajax_upload('#uploadCookImage', {
        action: '/uajax/upCookImageFile',
        name: 'uploadFile',
        data: {imgType: 'coverImage'},
        dataType: 'json',
        onSubmit: function (file, ext) {
            ext = ext.toLowerCase();
            $("#uploadCookImage").hide();
            $("#upCookImageCover").attr('src', '').hide();
            $('#imgUploadNow').show();
            $('#iloading').show();
            $(".ic_chare2").hide();
            if (!(ext && /^(jpg|png|jpeg|gif)$/i.test(ext))) {
                showErrorTips('图片格式不正确！');
                return false;
            }
        },
        onComplete: function (file, msg) {
            var msg = eval('(' + msg + ')');
            if (msg.code == 'Success') {
                $("#coverImageUrl").val(msg.upload);
                $('#imgUploadNow').hide();
                $('#upCookImageCover').attr("src", msg.imgUrl).show();
                $('#imgUploadSucc').show();
                $("#uploadCookImage").show();
                $('#iloading').hide();
            }
            else if (msg.code == 'slice') {
                showerrorinfo('提示', '您仍处在禁言期内，不能发表或编辑内容。');
            }
            else {
                showerrorinfo('温馨提示', '图片上传失败了！');
            }
        }
    })
})

/**
 * @desc: 添加主料/辅料信息栏目
 * @return: {String}
 **/
function addCaiLiaoInfo(str) {
    return '<div class="mct clearfix mbs"><span class="liao"><input type="text" class="liaoext r3 fcbm" name="' + str + '[]" value="" /></span><span class="liang"><input type="text" class="liangext r3 fcbm" name="' + str + 'Value[]" value="" /></span><a href="javascript:void(0);" class="wrng" tabIndex="-1"></a></div>';
}

/**
 * @desc: 添加详细步骤
 * @returns {String}
 * 2013-03-11
 **/
function addBuZhou() {
    var html = '<li class="nsetp mbm clearfix" style="cursor:move">'
    html += '<span class="tjbz mrl">'
    html += '<div class="icross2">'
    html += '添加步骤图'
    html += '</div>'
    html += '<div class="iloading">'
    html += '正在上传…'
    html += '</div>'
    html += '</span>'
    html += '<span class="upimgsucc tjbz mrl" style="display:none;">'
    html += '<img src="" style="width:140px;display:none;"/><input tabIndex="-1" type="hidden" name="setpImages[]" value="" /><span class="ic_chare" style="display:none;"></span>'
    html += '</span>'
    html += '<span class="umber rl3" title="按住左键即可拖动排序">1</span>'
    html += '<span class="bzmw mrs"><textarea onclick="$(this).focus();" name="setpInfos[]" class="steptext r3 fcbm"></textarea></span>'
    html += '<span class="sxgj hidden">'
    html += '<a href="javascript:void(0);" tabIndex="-1" class="ic_up"></a>'
    html += '<a href="javascript:void(0);" tabIndex="-1" class="ic_dw"></a>'
    html += ' <a href="javascript:void(0);" tabIndex="-1" class="ic_ad"></a>'
    html += ' <a href="javascript:void(0);" tabIndex="-1" class="ic_close"></a>'
    html += '</span>'
    html += '</li>'
    return html;
}

/**
 * @desc: 添加主料/辅料，重新绑定上传图片信息
 * @return: null
 **/
function actionInputFile() {
    $(".tjbz").find("div").remove();
    $(".tjbz").html('<div class="setp_images" style="widht:140px; height:90px;"><img src="" style="width:140px; height:89px;display:none;"/></div>');
}

/**
 * @desc: 重新整理上传步骤排序
 * @return: number
 **/
function resortStepPosition() {
    var pos = 1;
    $("span.umber").each(function () {
        $(this).text(pos);
        pos++;
    })
}

/**
 * @desc: 绑定步骤页面
 * @return: {string}
 **/
function uploadStepImg() {
    var butStepImage = $(this);
    $.ajax_upload(butStepImage, {
        action: '/uajax/upCookImageFile',
        name: 'uploadFile',
        data: {imgType: 'setpImage'},
        dataType: 'json',
        onSubmit: function (file, ext) {
            ext = ext.toLowerCase();
            butStepImage.hide();
            butStepImage.parent().next().show();
            butStepImage.parent().parent().next().find("img").attr("src", "").hide();
            butStepImage.parent().parent().next().append('<div id="loading" class="iloading"> 正在上传… </div>');
            butStepImage.parent().parent().next().find("span[class='ic_chare']").hide();
            if (!(ext && /^(jpg|png|jpeg|gif)$/.test(ext))) {
                showErrorTips('图片格式不正确！');
                return false;
            }
        },
        onComplete: function (file, msg) {
            var msg = eval('(' + msg + ')');
            if (msg.code == 'Success') {
                $("#loading").remove();
                butStepImage.parent().parent().hide();
                butStepImage.parent().parent().next().show();
                butStepImage.parent().parent().next().find("input[name='setpImages[]']").val(msg.upload);
                butStepImage.parent().parent().next().find("img").attr("src", msg.imgUrl).show();
            }
            else if (msg.code == 'slice') {
                showerrorinfo('温馨提示', '您仍处在禁言期内，不能发表或编辑内容。');
            }
            else {
                showerrorinfo('温馨提示', '图片上传失败！');
            }
        }
    })
}

/**
 * @desc: 绑定步骤页面
 * @return: {string}
 **/
function uploadStepImgOne(obj) {
    var butStepImage = obj;
    $.ajax_upload(butStepImage, {
        action: '/uajax/upCookImageFile',
        name: 'uploadFile',
        data: {imgType: 'setpImage'},
        dataType: 'json',
        onSubmit: function (file, ext) {
            ext = ext.toLowerCase();
            butStepImage.hide();
            butStepImage.parent().next().show();
            butStepImage.parent().parent().next().find("img").attr("src", "").hide();
            butStepImage.parent().parent().next().append('<div id="loading" class="iloading"> 正在上传… </div>');
            butStepImage.parent().parent().next().find("span[class='ic_chare']").hide();
            if (!(ext && /^(jpg|png|jpeg|gif)$/.test(ext))) {
                showErrorTips('图片格式不正确！');
                return false;
            }
        },
        onComplete: function (file, msg) {
            var msg = eval('(' + msg + ')');
            if (msg.code == 'Success') {
                butStepImage.parent().parent().hide();
                $("#loading").remove();
                butStepImage.parent().parent().next().show();
                butStepImage.parent().parent().next().find("input[name='setpImages[]']").val(msg.upload);
                butStepImage.parent().parent().next().find("img").attr("src", msg.imgUrl).show();
            }
            else if (msg.code == 'slice') {
                showerrorinfo('温馨提示', '您仍处在禁言期内，不能发表或编辑内容。');
            }
            else {
                showerrorinfo('温馨提示', '图片上传失败！');
            }
        }
    })
}


/**
 * @desc: 提交form表单信息
 * @return: boolean
 **/
function uploadInfos() {
    if ($("#sinatoken").val() == 1 && $("#bye").val() == 0 && $("#ajax_sina").attr("status") != 2) {
        notifySinaRebd(); //如果新浪超过90天引导重新注册
        return false;
    }
    showErrorTips('');
    var cookName = $("#cook_name").val();
    var cook_diff = $("#cook_difficulty").val();
    var cook_costtime = $("#costtime").val();
    var purview = $("#purview").val();
    //var setpInfo = $("input[name='setpImages[]']");
    if (cookName == '菜谱名称') {
        showErrorTips('没有填写菜谱名称！');
        backToTop();
        return false;
    }
    if (cookName.length > 30) {
        showErrorTips('菜谱名称字数过长！');
        backToTop();
        return false;
    }
    var coverImageUrl = $("#coverImageUrl").val();
    if (!coverImageUrl) {
        showErrorTips('没有上传菜谱成品图！');
        backToTop();
        return false;
    }

    var zhuliaoleng = parseInt($('#zhuliao').length);
    var zhuliaoInfo = '';
    if (zhuliaoleng > 0) {
        $("span[class=liao]").each(function () {
            zhuliaoInfo += ($(this).find("input").val() == undefined ? '' : $(this).find("input").val());
        });
        if (zhuliaoInfo == '' || zhuliaoInfo == '如:五花肉如:盐' || zhuliaoInfo == '如:五花肉') {
            showErrorTips('没有填写食材');
            backToTop();
            return false;
        }
    }

    var stepleng = ($(".nsetp").length);
    var stepinfo = '';
    if (stepleng > 0) {
        for (var i = 0; i < stepleng; i++) {
            stepinfo += $(".nsetp").find("textarea").eq(i).val();
        }
        if (stepinfo == '') {
            showErrorTips('没有填写详细步骤');
            backToTop();
            return false;
        }
    }

    if (cook_diff == '请选择' || cook_costtime == '请选择') {
        var str = cook_diff == '请选择' ? '请选择菜谱难度！' : '请选择菜谱时间！';
        showErrorTips(str);
        backToTop();
        return false;
    }

    $.ajax({
        type: "post",
        url: "/uajax/ajaxCheckUser?" + Math.random(),
        data: "ck=4",
        dataType: "json",
        async: false,
        success: function (msg) {
            if (msg.status == 'OK') {
                $("#uploadCaipuInfo").html("提交中...");
                $("#uploadCaipuInfo").attr('disabled', "true");
                $("#recipeform").submit();
            }
            else if (msg.data.error == 'noLogin') {
                logindialog();
            }
            else if (msg.data.error == 'slice') {
                showerrorinfo('提示', msg.data.tip);
            }
        }
    })
}

$("#username").blur(function () {
    $("#nickname").html('');
    var username = $("#username").val();
    if (username != '') {
        $.ajax({
            type: "post",
            url: "/uajax/getUserinfo",
            data: "username=" + username,
            dataType: "json",
            async: false,
            success: function (msg) {
                if (msg.data.info == 'OK') {
                    $("#userid").val(msg.data.user_id);
                    $("#nickname").html(msg.data.name);
                } else {
                    $("#nickname").html("用户名错误！");
                    $("#userid").val('');
                }
            }
        })
    }
})

//添加标签信息
function addcooktag(obj) {
    obj = $(obj);
    var diettags = $('#cooktags').val();
    if (obj.hasClass('tied')) {
        if (diettags == '') {
            return flase;
        }
        var search = '';
        if (diettags.indexOf(obj.html()) > 0) {
            search = ' ' + obj.html();
        }
        else {
            search = obj.html();
        }
        diettags = diettags.replace(search, '');
        if (diettags != '') {
            diettags = $.trim(diettags);
        }
        $('#cooktags').val(diettags);
        obj.removeClass('tied');
        $('.cooktag').each(function (k, v) {
            if ($(v).html() == obj.html()) {
                $(v).removeClass('tied');
            }
        })
        return true;
    }
    else {
        $('#cooktags').val(($.trim(diettags) == '多个标签用空格隔开' || $.trim(diettags) == '' ? '' : $.trim(diettags) + ' ') + obj.html());
        obj.addClass('tied');
        $('.cooktag').each(function (k, v) {
            if ($(v).html() == obj.html()) {
                $(v).addClass('tied');
            }
        })
    }
}
function showErrorTips(tips) {
    $("#upwrongtips").html(tips).show();
}
function backToTop(num) {
    var num = typeof num == 'undefined' ? 0 : num;
    if (num == 0) {
        t = $(document).scrollTop();
        num = t;
    }
    var t = $(document).scrollTop();
    $(document).scrollTop(t - num);
}

$('#imgUploadSucc').live('mouseover', function () {
    $('.ic_chare2').show();
});
$('#imgUploadSucc').live('mouseout', function () {
    $('.ic_chare2').hide();
});
$('#imgUploadSucc .ic_chare2').live('click', function () {
    $('#imgUploadNow div[specid=uploadspecid]').attr('id', 'uploadDishImage');
    $("#tipInfos").show();
    $("#uploadCookImage").next().click();
    $(".iload").hide();
    $('#coverImageUrl').val("");
    editUploadImg($('#imgUploadNow div[specid=uploadspecid]'));
});

$('.upimgsucc').live("mouseover", function () {
    $(this).find("span").show();
});

$('.upimgsucc').live("mouseout", function () {
    $(this).find("span").hide();
});

$('.liaoext').live('focus',
    function () {
        var p = $(this).parent().parent().next().attr("class");
        if (p == "adlan") {
            if ($(this).attr("name") == "zhuliao[]") {
                try {
                    $("#zhuliao").click();
                } catch (e) {
                    _spClick($("#zhuliao").get(0));
                }
            }
            else if ($(this).attr("name") == "fuliao[]") {
                try {
                    $("#fuliao").click();
                } catch (e) {
                    _spClick($("#fuliao").get(0));
                }
            }
        }
    });
$('.steptext').live('focus',
    function () {
        var p = $(this).parent().parent().next().attr("class");
        if (p != "nsetp mbm clearfix") {
            try {
                $("#addBuZhou").click();
            } catch (e) {
                _spClick($("#addBuZhou").get(0));
            }
        }
    });

function _spClick($obj) {
    var event = document.createEvent("MouseEvents");
    event.initEvent("click", true, true);
    $obj.dispatchEvent(event);
}

$('.ic_chare').live('click', function () {
    var $aimobj = $(this).parent().prev().children().find("div[class='icross2 hover']");
    if ($aimobj.attr("class") == undefined) {
        var $aimobj = $(this).parent().prev().children().find("div[class='icross2']");
    }
    $aimobj.show();
    $aimobj.next().click();
    $(this).parent().prev().children().find("div[class='icross2']").show();
    $(this).parent().prev().find("div[class='iloading']").hide();
    $(this).parent().find("input[name='setpImages[]']").val("");

});
//ic_chare
$(function () {
    $("#phonetic1").sortable({
            update: function (event, ui) {
            }
        }
    );
    $("#phonetic1").on("sortupdate", function (event, ui) {
        resortStepPosition();
    });
});

$(".umber").attr("title", "按住左键即可拖动排序");
$(".upimgsucc").attr("title", "按住左键即可拖动排序");
$(".ic_chare").attr("title", "更换图片");
$(".cooktag").live("click", function () {
    var tagvalue = $(this).html();
    var typevalue = $(this).attr("info");
    if ($(this).hasClass('tied')) {
        dbclicktag(tagvalue);
        tageffect(tagvalue, 'del');
    } else {
        addTagInfo(tagvalue, typevalue);
    }
})

//输入框输入标签信息
/*
 $("#taginfo").keyup(function(event){
 if(event.keyCode == 32)
 {
 var tagvalue = $.trim($(this).val());
 if(tagvalue.length > 0)
 {
 if(tagvalue.length <= 5)
 {
 $(this).val(' ');
 var typevalue = $(this).attr("info");
 addTagInfo(tagvalue, typevalue);
 }else
 {
 showerrorinfo('温馨提示', '标签太长了哦！');
 }
 }
 }
 })
 */
//输入框输入标签信息
$("#taginfo").live('blur', function (event) {
    var inputvalue = $.trim($(this).val());
    $(this).val(' ');
    var tagarr = inputvalue.split(' ');
    if (tagarr.length) {
        for (var i = 0; i < tagarr.length; i++) {
            var tagvalue = tagarr[i];
            if (tagvalue == '')continue;
            if (tagvalue.length > 0) {
                if (tagvalue.length <= 10) {
                    $(this).val(' ');
                    var typevalue = $(this).attr("info");
                    addTagInfo(tagvalue, typevalue);
                } else {
                    showerrorinfo('温馨提示', '标签太长了哦！');
                }
            }
        }
    }
    /*
     if(tagvalue.length > 0)
     {
     if(tagvalue.length <= 5)
     {
     $(this).val(' ');
     var typevalue = $(this).attr("info");
     addTagInfo(tagvalue, typevalue);
     }else
     {
     showerrorinfo('温馨提示', '标签太长了哦！');
     }
     }
     */
})

/**
 * @desc: 循环添加标签信息
 * @param: string
 **/
function addTagInfo(tag, type) {
    var bool = checktaginfo(tag);
    if (bool) {
        tageffect(tag, 'add');
        if (type == 'cook') {
            var html = '<span class="mpad bime">' + tag + ' <input type="hidden" name="tagname[]" value="' + tag + '"><a href="javascript:void(0);" class="ic_lcox"></a></span>';
        } else {
            var html = '<span class="mpad">' + tag + ' <input type="hidden" name="tagname[]" value="' + tag + '"><a href="javascript:void(0);" class="ic_lcox"></a></span>';
        }
        $(".intput").before(html);
        $(this).addClass("tied");
    }
}

/**
 * @desc: 检查标签是否存在
 * @return: boolean
 **/
function checktaginfo(tagname) {
    var bool = false;
    var tagstr = $(".mpad").length;
    /*
     if(tagstr < 6)
     {
     */
    if (tagstr > 0) {
        for (var i = 0; i < tagstr; i++) {
            var tagvalue = $(".mpad").find("input").eq(i).val();
            if (tagvalue == tagname) {
                showerrorinfo('温馨提示', '不能重复添加！');
                return bool;
            }
        }
        bool = true;
    } else {
        bool = true;
    }
    /*
     }else
     {
     showerrorinfo('温馨提示', '添加标签已达到上限！');
     }
     */
    return bool;
}

/**
 * @desc: 添加标签不同效果
 * @return: null
 **/
function tageffect(tagname, type) {
    var tagstr = $(".cooktag").length;
    if (tagstr > 0) {
        for (var i = 0; i < tagstr; i++) {
            var tagvalue = $(".cooktag").eq(i).html();
            if (tagname == tagvalue) {
                if (type == 'add') {
                    $(".cooktag").eq(i).addClass("tied");
                } else {
                    $(".cooktag").eq(i).removeClass("tied");
                }
            }
        }
    }
}

/**
 * @desc:再次点击标签取消标签信息
 * @return: null
 **/
function dbclicktag(tagname) {
    var mpadstr = $(".mpad").length;
    if (mpadstr > 0) {
        for (var i = 0; i < mpadstr; i++) {
            var tagvalue = $(".mpad").find("input").eq(i).val();
            if (tagvalue == tagname) {
                $(".mpad").find("input").eq(i).parent().remove();
            }
        }
    }
}

/**
 * @desc: 获取标签信息
 * @return:
 **/
function gettaginfo() {
    var taglen = $(".mpad").length;
    var tagvalue = '';
    if (taglen > 0) {
        for (var i = 0; i < taglen; i++) {
            var char = ((taglen - 1) == i) ? '' : ',';
            var tagval = $(".mpad").find("input").eq(i).val();
            tagvalue += tagval + char;
        }
    }
    return tagvalue;
}

/**
 * @desc: 删除标签信息
 * @return: boolean
 **/
$(".ic_lcox").live("click", function () {
    var tagname = $(this).parent().find("input").val();
    //$("#taginfo").blur();
    tageffect(tagname, 'del');
    $(this).parent().remove();
})
function preLoad() {
    if (!this.support.loading) {
        alert("You need the Flash Player 9.028 or above to use SWFUpload.");
        return false
    }
}
function loadFailed() {
}
function fileQueued(C) {
    try {
        var B = new FileProgress(C, this.customSettings.progressTarget);
        B.setStatus("Pending...");
        B.toggleCancel(true, this)
    } catch (A) {
        this.debug(A)
    }
}
function fileQueueError(E, D, A) {
    try {
        if (D === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
            alert("You have attempted to queue too many files.\n" + (A === 0 ? "You have reached the upload limit." : "You may select " + (A > 1 ? "up to " + A + " files." : "one file.")));
            return
        }
        var C = new FileProgress(E, this.customSettings.progressTarget);
        C.setError();
        C.toggleCancel(false);
        switch (D) {
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                C.setStatus("File is too big.");
                this.debug("Error Code: File too big, File name: " + E.name + ", File size: " + E.size + ", Message: " + A);
                break;
            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                C.setStatus("Cannot upload Zero Byte files.");
                this.debug("Error Code: Zero byte file, File name: " + E.name + ", File size: " + E.size + ", Message: " + A);
                break;
            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                C.setStatus("Invalid File Type.");
                this.debug("Error Code: Invalid File Type, File name: " + E.name + ", File size: " + E.size + ", Message: " + A);
                break;
            default:
                if (E !== null) {
                    C.setStatus("Unhandled Error")
                }
                this.debug("Error Code: " + D + ", File name: " + E.name + ", File size: " + E.size + ", Message: " + A);
                break
        }
    } catch (B) {
        this.debug(B)
    }
}
function fileDialogComplete(C, A) {
    try {
        if (C > 0) {
        }
        this.startUpload()
    } catch (B) {
        this.debug(B)
    }
}
function uploadStart(C) {
    try {
        var B = new FileProgress(C, this.customSettings.progressTarget);
        B.setStatus("Uploading...");
        B.toggleCancel(true, this)
    } catch (A) {
    }
    return true
}
function uploadProgress(E, F, B) {
    try {
        var A = Math.ceil((F / B) * 100);
        var D = new FileProgress(E, this.customSettings.progressTarget);
        D.setProgress(A);
        D.setStatus("Uploading...")
    } catch (C) {
        this.debug(C)
    }
}
function uploadSuccess(D, B) {
    try {
        var C = new FileProgress(D, this.customSettings.progressTarget);
        C.setComplete();
        C.setStatus("Complete.");
        C.toggleCancel(false);
        C.setShowImage(B)
    } catch (A) {
        this.debug(A)
    }
}
function uploadError(E, D, A) {
    try {
        var C = new FileProgress(E, this.customSettings.progressTarget);
        C.setError();
        C.toggleCancel(false);
        switch (D) {
            case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
                C.setStatus("Upload Error: " + A);
                this.debug("Error Code: HTTP Error, File name: " + E.name + ", Message: " + A);
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
                C.setStatus("Upload Failed.");
                this.debug("Error Code: Upload Failed, File name: " + E.name + ", File size: " + E.size + ", Message: " + A);
                break;
            case SWFUpload.UPLOAD_ERROR.IO_ERROR:
                C.setStatus("Server (IO) Error");
                this.debug("Error Code: IO Error, File name: " + E.name + ", Message: " + A);
                break;
            case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
                C.setStatus("Security Error");
                this.debug("Error Code: Security Error, File name: " + E.name + ", Message: " + A);
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
                C.setStatus("Upload limit exceeded.");
                this.debug("Error Code: Upload Limit Exceeded, File name: " + E.name + ", File size: " + E.size + ", Message: " + A);
                break;
            case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
                C.setStatus("Failed Validation.  Upload skipped.");
                this.debug("Error Code: File Validation Failed, File name: " + E.name + ", File size: " + E.size + ", Message: " + A);
                break;
            case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
                if (this.getStats().files_queued === 0) {
                }
                C.setStatus("Cancelled");
                C.setCancelled();
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
                C.setStatus("Stopped");
                break;
            default:
                C.setStatus("Unhandled Error: " + D);
                this.debug("Error Code: " + D + ", File name: " + E.name + ", File size: " + E.size + ", Message: " + A);
                break
        }
    } catch (B) {
        this.debug(B)
    }
}
function uploadComplete(A) {
    if (this.getStats().files_queued === 0) {
    }
}
function queueComplete(A) {
    var B = document.getElementById("divStatus")
};var SWFUpload;
var swfobject;
if (SWFUpload == undefined) {
    SWFUpload = function (A) {
        this.initSWFUpload(A)
    }
}
SWFUpload.prototype.initSWFUpload = function (B) {
    try {
        this.customSettings = {};
        this.settings = {};
        this.eventQueue = [];
        this.movieName = "SWFUpload_" + SWFUpload.movieCount++;
        this.movieElement = null;
        SWFUpload.instances[this.movieName] = this;
        this.initSettings(B);
        this.loadSupport();
        if (this.swfuploadPreload()) {
            this.loadFlash()
        }
        this.displayDebugInfo()
    } catch (A) {
        delete SWFUpload.instances[this.movieName];
        throw A
    }
};
SWFUpload.instances = {};
SWFUpload.movieCount = 0;
SWFUpload.version = "2.5.0 2010-01-15 Beta 2";
SWFUpload.QUEUE_ERROR = {
    QUEUE_LIMIT_EXCEEDED: -100,
    FILE_EXCEEDS_SIZE_LIMIT: -110,
    ZERO_BYTE_FILE: -120,
    INVALID_FILETYPE: -130
};
SWFUpload.UPLOAD_ERROR = {
    HTTP_ERROR: -200,
    MISSING_UPLOAD_URL: -210,
    IO_ERROR: -220,
    SECURITY_ERROR: -230,
    UPLOAD_LIMIT_EXCEEDED: -240,
    UPLOAD_FAILED: -250,
    SPECIFIED_FILE_ID_NOT_FOUND: -260,
    FILE_VALIDATION_FAILED: -270,
    FILE_CANCELLED: -280,
    UPLOAD_STOPPED: -290,
    RESIZE: -300
};
SWFUpload.FILE_STATUS = {QUEUED: -1, IN_PROGRESS: -2, ERROR: -3, COMPLETE: -4, CANCELLED: -5};
SWFUpload.UPLOAD_TYPE = {NORMAL: -1, RESIZED: -2};
SWFUpload.BUTTON_ACTION = {SELECT_FILE: -100, SELECT_FILES: -110, START_UPLOAD: -120, JAVASCRIPT: -130, NONE: -130};
SWFUpload.CURSOR = {ARROW: -1, HAND: -2};
SWFUpload.WINDOW_MODE = {WINDOW: "window", TRANSPARENT: "transparent", OPAQUE: "opaque"};
SWFUpload.RESIZE_ENCODING = {JPEG: -1, PNG: -2};
SWFUpload.completeURL = function (B) {
    try {
        var D = "", A = -1;
        if (typeof(B) !== "string" || B.match(/^https?:\/\//i) || B.match(/^\//) || B === "") {
            return B
        }
        A = window.location.pathname.lastIndexOf("/");
        if (A <= 0) {
            D = "/"
        } else {
            D = window.location.pathname.substr(0, A) + "/"
        }
        return D + B
    } catch (C) {
        return B
    }
};
SWFUpload.onload = function () {
};
SWFUpload.prototype.initSettings = function (A) {
    this.ensureDefault = function (B, D) {
        var C = A[B];
        if (C != undefined) {
            this.settings[B] = C
        } else {
            this.settings[B] = D
        }
    };
    this.ensureDefault("upload_url", "");
    this.ensureDefault("preserve_relative_urls", false);
    this.ensureDefault("file_post_name", "Filedata");
    this.ensureDefault("post_params", {});
    this.ensureDefault("use_query_string", false);
    this.ensureDefault("requeue_on_error", false);
    this.ensureDefault("http_success", []);
    this.ensureDefault("assume_success_timeout", 0);
    this.ensureDefault("file_types", "*.*");
    this.ensureDefault("file_types_description", "All Files");
    this.ensureDefault("file_size_limit", 0);
    this.ensureDefault("file_upload_limit", 0);
    this.ensureDefault("file_queue_limit", 0);
    this.ensureDefault("flash_url", "swfupload.swf");
    this.ensureDefault("flash9_url", "swfupload_fp9.swf");
    this.ensureDefault("prevent_swf_caching", true);
    this.ensureDefault("button_image_url", "");
    this.ensureDefault("button_width", 1);
    this.ensureDefault("button_height", 1);
    this.ensureDefault("button_text", "");
    this.ensureDefault("button_text_style", "color: #000000; font-size: 16pt;");
    this.ensureDefault("button_text_top_padding", 0);
    this.ensureDefault("button_text_left_padding", 0);
    this.ensureDefault("button_action", SWFUpload.BUTTON_ACTION.SELECT_FILES);
    this.ensureDefault("button_disabled", false);
    this.ensureDefault("button_placeholder_id", "");
    this.ensureDefault("button_placeholder", null);
    this.ensureDefault("button_cursor", SWFUpload.CURSOR.ARROW);
    this.ensureDefault("button_window_mode", SWFUpload.WINDOW_MODE.TRANSPARENT);
    this.ensureDefault("debug", false);
    this.settings.debug_enabled = this.settings.debug;
    this.settings.return_upload_start_handler = this.returnUploadStart;
    this.ensureDefault("swfupload_preload_handler", null);
    this.ensureDefault("swfupload_load_failed_handler", null);
    this.ensureDefault("swfupload_loaded_handler", null);
    this.ensureDefault("file_dialog_start_handler", null);
    this.ensureDefault("file_queued_handler", null);
    this.ensureDefault("file_queue_error_handler", null);
    this.ensureDefault("file_dialog_complete_handler", null);
    this.ensureDefault("upload_resize_start_handler", null);
    this.ensureDefault("upload_start_handler", null);
    this.ensureDefault("upload_progress_handler", null);
    this.ensureDefault("upload_error_handler", null);
    this.ensureDefault("upload_success_handler", null);
    this.ensureDefault("upload_complete_handler", null);
    this.ensureDefault("mouse_click_handler", null);
    this.ensureDefault("mouse_out_handler", null);
    this.ensureDefault("mouse_over_handler", null);
    this.ensureDefault("debug_handler", this.debugMessage);
    this.ensureDefault("custom_settings", {});
    this.customSettings = this.settings.custom_settings;
    if (!!this.settings.prevent_swf_caching) {
        this.settings.flash_url = this.settings.flash_url + (this.settings.flash_url.indexOf("?") < 0 ? "?" : "&") + "preventswfcaching=" + new Date().getTime();
        this.settings.flash9_url = this.settings.flash9_url + (this.settings.flash9_url.indexOf("?") < 0 ? "?" : "&") + "preventswfcaching=" + new Date().getTime()
    }
    if (!this.settings.preserve_relative_urls) {
        this.settings.upload_url = SWFUpload.completeURL(this.settings.upload_url);
        this.settings.button_image_url = SWFUpload.completeURL(this.settings.button_image_url)
    }
    delete this.ensureDefault
};
SWFUpload.prototype.loadSupport = function () {
    this.support = {
        loading: swfobject.hasFlashPlayerVersion("9.0.28"),
        imageResize: swfobject.hasFlashPlayerVersion("10.0.0")
    }
};
SWFUpload.prototype.loadFlash = function () {
    var D, C, E, F, A;
    if (!this.support.loading) {
        this.queueEvent("swfupload_load_failed_handler", ["Flash Player doesn't support SWFUpload"]);
        return
    }
    if (document.getElementById(this.movieName) !== null) {
        this.support.loading = false;
        this.queueEvent("swfupload_load_failed_handler", ["Element ID already in use"]);
        return
    }
    D = document.getElementById(this.settings.button_placeholder_id) || this.settings.button_placeholder;
    if (D == undefined) {
        this.support.loading = false;
        this.queueEvent("swfupload_load_failed_handler", ["button place holder not found"]);
        return
    }
    E = (D.currentStyle && D.currentStyle["display"] || window.getComputedStyle && document.defaultView.getComputedStyle(D, null).getPropertyValue("display")) !== "block" ? "span" : "div";
    C = document.createElement(E);
    F = this.getFlashHTML();
    try {
        C.innerHTML = F
    } catch (B) {
        this.support.loading = false;
        this.queueEvent("swfupload_load_failed_handler", ["Exception loading Flash HTML into placeholder"]);
        return
    }
    A = C.getElementsByTagName("object");
    if (!A || A.length > 1 || A.length === 0) {
        this.support.loading = false;
        this.queueEvent("swfupload_load_failed_handler", ["Unable to find movie after adding to DOM"]);
        return
    } else {
        if (A.length === 1) {
            this.movieElement = A[0]
        }
    }
    D.parentNode.replaceChild(C.firstChild, D);
    if (window[this.movieName] == undefined) {
        window[this.movieName] = this.getMovieElement()
    }
};
SWFUpload.prototype.getFlashHTML = function (A) {
    return ['<object id="', this.movieName, '" type="application/x-shockwave-flash" data="', (this.support.imageResize ? this.settings.flash_url : this.settings.flash9_url), '" width="', this.settings.button_width, '" height="', this.settings.button_height, '" class="swfupload">', '<param name="wmode" value="', this.settings.button_window_mode, '" />', '<param name="movie" value="', (this.support.imageResize ? this.settings.flash_url : this.settings.flash9_url), '" />', '<param name="quality" value="high" />', '<param name="allowScriptAccess" value="always" />', '<param name="flashvars" value="' + this.getFlashVars() + '" />', "</object>"].join("")
};
SWFUpload.prototype.getFlashVars = function () {
    var A, B;
    B = this.buildParamString();
    A = this.settings.http_success.join(",");
    return ["movieName=", encodeURIComponent(this.movieName), "&amp;uploadURL=", encodeURIComponent(this.settings.upload_url), "&amp;useQueryString=", encodeURIComponent(this.settings.use_query_string), "&amp;requeueOnError=", encodeURIComponent(this.settings.requeue_on_error), "&amp;httpSuccess=", encodeURIComponent(A), "&amp;assumeSuccessTimeout=", encodeURIComponent(this.settings.assume_success_timeout), "&amp;params=", encodeURIComponent(B), "&amp;filePostName=", encodeURIComponent(this.settings.file_post_name), "&amp;fileTypes=", encodeURIComponent(this.settings.file_types), "&amp;fileTypesDescription=", encodeURIComponent(this.settings.file_types_description), "&amp;fileSizeLimit=", encodeURIComponent(this.settings.file_size_limit), "&amp;fileUploadLimit=", encodeURIComponent(this.settings.file_upload_limit), "&amp;fileQueueLimit=", encodeURIComponent(this.settings.file_queue_limit), "&amp;debugEnabled=", encodeURIComponent(this.settings.debug_enabled), "&amp;buttonImageURL=", encodeURIComponent(this.settings.button_image_url), "&amp;buttonWidth=", encodeURIComponent(this.settings.button_width), "&amp;buttonHeight=", encodeURIComponent(this.settings.button_height), "&amp;buttonText=", encodeURIComponent(this.settings.button_text), "&amp;buttonTextTopPadding=", encodeURIComponent(this.settings.button_text_top_padding), "&amp;buttonTextLeftPadding=", encodeURIComponent(this.settings.button_text_left_padding), "&amp;buttonTextStyle=", encodeURIComponent(this.settings.button_text_style), "&amp;buttonAction=", encodeURIComponent(this.settings.button_action), "&amp;buttonDisabled=", encodeURIComponent(this.settings.button_disabled), "&amp;buttonCursor=", encodeURIComponent(this.settings.button_cursor)].join("")
};
SWFUpload.prototype.getMovieElement = function () {
    if (this.movieElement == undefined) {
        this.movieElement = document.getElementById(this.movieName)
    }
    if (this.movieElement === null) {
        throw"Could not find Flash element"
    }
    return this.movieElement
};
SWFUpload.prototype.buildParamString = function () {
    var C, B, A = [];
    B = this.settings.post_params;
    if (typeof(B) === "object") {
        for (C in B) {
            if (B.hasOwnProperty(C)) {
                A.push(encodeURIComponent(C.toString()) + "=" + encodeURIComponent(B[C].toString()))
            }
        }
    }
    return A.join("&amp;")
};
SWFUpload.prototype.destroy = function () {
    var A;
    try {
        this.cancelUpload(null, false);
        A = this.cleanUp();
        if (A) {
            try {
                A.parentNode.removeChild(A)
            } catch (C) {
            }
        }
        window[this.movieName] = null;
        SWFUpload.instances[this.movieName] = null;
        delete SWFUpload.instances[this.movieName];
        this.movieElement = null;
        this.settings = null;
        this.customSettings = null;
        this.eventQueue = null;
        this.movieName = null;
        return true
    } catch (B) {
        return false
    }
};
SWFUpload.prototype.displayDebugInfo = function () {
    this.debug(["---SWFUpload Instance Info---\n", "Version: ", SWFUpload.version, "\n", "Movie Name: ", this.movieName, "\n", "Settings:\n", "\t", "upload_url:               ", this.settings.upload_url, "\n", "\t", "flash_url:                ", this.settings.flash_url, "\n", "\t", "flash9_url:                ", this.settings.flash9_url, "\n", "\t", "use_query_string:         ", this.settings.use_query_string.toString(), "\n", "\t", "requeue_on_error:         ", this.settings.requeue_on_error.toString(), "\n", "\t", "http_success:             ", this.settings.http_success.join(", "), "\n", "\t", "assume_success_timeout:   ", this.settings.assume_success_timeout, "\n", "\t", "file_post_name:           ", this.settings.file_post_name, "\n", "\t", "post_params:              ", this.settings.post_params.toString(), "\n", "\t", "file_types:               ", this.settings.file_types, "\n", "\t", "file_types_description:   ", this.settings.file_types_description, "\n", "\t", "file_size_limit:          ", this.settings.file_size_limit, "\n", "\t", "file_upload_limit:        ", this.settings.file_upload_limit, "\n", "\t", "file_queue_limit:         ", this.settings.file_queue_limit, "\n", "\t", "debug:                    ", this.settings.debug.toString(), "\n", "\t", "prevent_swf_caching:      ", this.settings.prevent_swf_caching.toString(), "\n", "\t", "button_placeholder_id:    ", this.settings.button_placeholder_id.toString(), "\n", "\t", "button_placeholder:       ", (this.settings.button_placeholder ? "Set" : "Not Set"), "\n", "\t", "button_image_url:         ", this.settings.button_image_url.toString(), "\n", "\t", "button_width:             ", this.settings.button_width.toString(), "\n", "\t", "button_height:            ", this.settings.button_height.toString(), "\n", "\t", "button_text:              ", this.settings.button_text.toString(), "\n", "\t", "button_text_style:        ", this.settings.button_text_style.toString(), "\n", "\t", "button_text_top_padding:  ", this.settings.button_text_top_padding.toString(), "\n", "\t", "button_text_left_padding: ", this.settings.button_text_left_padding.toString(), "\n", "\t", "button_action:            ", this.settings.button_action.toString(), "\n", "\t", "button_cursor:            ", this.settings.button_cursor.toString(), "\n", "\t", "button_disabled:          ", this.settings.button_disabled.toString(), "\n", "\t", "custom_settings:          ", this.settings.custom_settings.toString(), "\n", "Event Handlers:\n", "\t", "swfupload_preload_handler assigned:  ", (typeof this.settings.swfupload_preload_handler === "function").toString(), "\n", "\t", "swfupload_load_failed_handler assigned:  ", (typeof this.settings.swfupload_load_failed_handler === "function").toString(), "\n", "\t", "swfupload_loaded_handler assigned:  ", (typeof this.settings.swfupload_loaded_handler === "function").toString(), "\n", "\t", "mouse_click_handler assigned:       ", (typeof this.settings.mouse_click_handler === "function").toString(), "\n", "\t", "mouse_over_handler assigned:        ", (typeof this.settings.mouse_over_handler === "function").toString(), "\n", "\t", "mouse_out_handler assigned:         ", (typeof this.settings.mouse_out_handler === "function").toString(), "\n", "\t", "file_dialog_start_handler assigned: ", (typeof this.settings.file_dialog_start_handler === "function").toString(), "\n", "\t", "file_queued_handler assigned:       ", (typeof this.settings.file_queued_handler === "function").toString(), "\n", "\t", "file_queue_error_handler assigned:  ", (typeof this.settings.file_queue_error_handler === "function").toString(), "\n", "\t", "upload_resize_start_handler assigned:      ", (typeof this.settings.upload_resize_start_handler === "function").toString(), "\n", "\t", "upload_start_handler assigned:      ", (typeof this.settings.upload_start_handler === "function").toString(), "\n", "\t", "upload_progress_handler assigned:   ", (typeof this.settings.upload_progress_handler === "function").toString(), "\n", "\t", "upload_error_handler assigned:      ", (typeof this.settings.upload_error_handler === "function").toString(), "\n", "\t", "upload_success_handler assigned:    ", (typeof this.settings.upload_success_handler === "function").toString(), "\n", "\t", "upload_complete_handler assigned:   ", (typeof this.settings.upload_complete_handler === "function").toString(), "\n", "\t", "debug_handler assigned:             ", (typeof this.settings.debug_handler === "function").toString(), "\n", "Support:\n", "\t", "Load:                     ", (this.support.loading ? "Yes" : "No"), "\n", "\t", "Image Resize:             ", (this.support.imageResize ? "Yes" : "No"), "\n"].join(""))
};
SWFUpload.prototype.addSetting = function (A, B, C) {
    if (B == undefined) {
        return (this.settings[A] = C)
    } else {
        return (this.settings[A] = B)
    }
};
SWFUpload.prototype.getSetting = function (A) {
    if (this.settings[A] != undefined) {
        return this.settings[A]
    }
    return ""
};
SWFUpload.prototype.callFlash = function (functionName, argumentArray) {
    var movieElement, returnValue, returnString;
    argumentArray = argumentArray || [];
    movieElement = this.getMovieElement();
    try {
        if (movieElement != undefined) {
            returnString = movieElement.CallFunction('<invoke name="' + functionName + '" returntype="javascript">' + __flash__argumentsToXML(argumentArray, 0) + "</invoke>");
            returnValue = eval(returnString)
        } else {
            this.debug("Can't call flash because the movie wasn't found.")
        }
    } catch (ex) {
        this.debug("Exception calling flash function '" + functionName + "': " + ex.message)
    }
    if (returnValue != undefined && typeof returnValue.post === "object") {
        returnValue = this.unescapeFilePostParams(returnValue)
    }
    return returnValue
};
SWFUpload.prototype.selectFile = function () {
    this.callFlash("SelectFile")
};
SWFUpload.prototype.selectFiles = function () {
    this.callFlash("SelectFiles")
};
SWFUpload.prototype.startUpload = function (A) {
    this.callFlash("StartUpload", [A])
};
SWFUpload.prototype.startResizedUpload = function (B, F, A, C, E, D) {
    this.callFlash("StartUpload", [B, {"width": F, "height": A, "encoding": C, "quality": E, "allowEnlarging": D}])
};
SWFUpload.prototype.cancelUpload = function (B, A) {
    if (A !== false) {
        A = true
    }
    this.callFlash("CancelUpload", [B, A])
};
SWFUpload.prototype.stopUpload = function () {
    this.callFlash("StopUpload")
};
SWFUpload.prototype.requeueUpload = function (A) {
    return this.callFlash("RequeueUpload", [A])
};
SWFUpload.prototype.getStats = function () {
    return this.callFlash("GetStats")
};
SWFUpload.prototype.setStats = function (A) {
    this.callFlash("SetStats", [A])
};
SWFUpload.prototype.getFile = function (A) {
    if (typeof(A) === "number") {
        return this.callFlash("GetFileByIndex", [A])
    } else {
        return this.callFlash("GetFile", [A])
    }
};
SWFUpload.prototype.getQueueFile = function (A) {
    if (typeof(A) === "number") {
        return this.callFlash("GetFileByQueueIndex", [A])
    } else {
        return this.callFlash("GetFile", [A])
    }
};
SWFUpload.prototype.addFileParam = function (A, B, C) {
    return this.callFlash("AddFileParam", [A, B, C])
};
SWFUpload.prototype.removeFileParam = function (A, B) {
    this.callFlash("RemoveFileParam", [A, B])
};
SWFUpload.prototype.setUploadURL = function (A) {
    this.settings.upload_url = A.toString();
    this.callFlash("SetUploadURL", [A])
};
SWFUpload.prototype.setPostParams = function (A) {
    this.settings.post_params = A;
    this.callFlash("SetPostParams", [A])
};
SWFUpload.prototype.addPostParam = function (A, B) {
    this.settings.post_params[A] = B;
    this.callFlash("SetPostParams", [this.settings.post_params])
};
SWFUpload.prototype.removePostParam = function (A) {
    delete this.settings.post_params[A];
    this.callFlash("SetPostParams", [this.settings.post_params])
};
SWFUpload.prototype.setFileTypes = function (A, B) {
    this.settings.file_types = A;
    this.settings.file_types_description = B;
    this.callFlash("SetFileTypes", [A, B])
};
SWFUpload.prototype.setFileSizeLimit = function (A) {
    this.settings.file_size_limit = A;
    this.callFlash("SetFileSizeLimit", [A])
};
SWFUpload.prototype.setFileUploadLimit = function (A) {
    this.settings.file_upload_limit = A;
    this.callFlash("SetFileUploadLimit", [A])
};
SWFUpload.prototype.setFileQueueLimit = function (A) {
    this.settings.file_queue_limit = A;
    this.callFlash("SetFileQueueLimit", [A])
};
SWFUpload.prototype.setFilePostName = function (A) {
    this.settings.file_post_name = A;
    this.callFlash("SetFilePostName", [A])
};
SWFUpload.prototype.setUseQueryString = function (A) {
    this.settings.use_query_string = A;
    this.callFlash("SetUseQueryString", [A])
};
SWFUpload.prototype.setRequeueOnError = function (A) {
    this.settings.requeue_on_error = A;
    this.callFlash("SetRequeueOnError", [A])
};
SWFUpload.prototype.setHTTPSuccess = function (A) {
    if (typeof A === "string") {
        A = A.replace(" ", "").split(",")
    }
    this.settings.http_success = A;
    this.callFlash("SetHTTPSuccess", [A])
};
SWFUpload.prototype.setAssumeSuccessTimeout = function (A) {
    this.settings.assume_success_timeout = A;
    this.callFlash("SetAssumeSuccessTimeout", [A])
};
SWFUpload.prototype.setDebugEnabled = function (A) {
    this.settings.debug_enabled = A;
    this.callFlash("SetDebugEnabled", [A])
};
SWFUpload.prototype.setButtonImageURL = function (A) {
    if (A == undefined) {
        A = ""
    }
    this.settings.button_image_url = A;
    this.callFlash("SetButtonImageURL", [A])
};
SWFUpload.prototype.setButtonDimensions = function (C, A) {
    this.settings.button_width = C;
    this.settings.button_height = A;
    var B = this.getMovieElement();
    if (B != undefined) {
        B.style.width = C + "px";
        B.style.height = A + "px"
    }
    this.callFlash("SetButtonDimensions", [C, A])
};
SWFUpload.prototype.setButtonText = function (A) {
    this.settings.button_text = A;
    this.callFlash("SetButtonText", [A])
};
SWFUpload.prototype.setButtonTextPadding = function (A, B) {
    this.settings.button_text_top_padding = B;
    this.settings.button_text_left_padding = A;
    this.callFlash("SetButtonTextPadding", [A, B])
};
SWFUpload.prototype.setButtonTextStyle = function (A) {
    this.settings.button_text_style = A;
    this.callFlash("SetButtonTextStyle", [A])
};
SWFUpload.prototype.setButtonDisabled = function (A) {
    this.settings.button_disabled = A;
    this.callFlash("SetButtonDisabled", [A])
};
SWFUpload.prototype.setButtonAction = function (A) {
    this.settings.button_action = A;
    this.callFlash("SetButtonAction", [A])
};
SWFUpload.prototype.setButtonCursor = function (A) {
    this.settings.button_cursor = A;
    this.callFlash("SetButtonCursor", [A])
};
SWFUpload.prototype.queueEvent = function (C, A) {
    var B = this;
    if (A == undefined) {
        A = []
    } else {
        if (!(A instanceof Array)) {
            A = [A]
        }
    }
    if (typeof this.settings[C] === "function") {
        this.eventQueue.push(function () {
            this.settings[C].apply(this, A)
        });
        setTimeout(function () {
            B.executeNextEvent()
        }, 0)
    } else {
        if (this.settings[C] !== null) {
            throw"Event handler " + C + " is unknown or is not a function"
        }
    }
};
SWFUpload.prototype.executeNextEvent = function () {
    var A = this.eventQueue ? this.eventQueue.shift() : null;
    if (typeof(A) === "function") {
        A.apply(this)
    }
};
SWFUpload.prototype.unescapeFilePostParams = function (E) {
    var B = /[$]([0-9a-f]{4})/i, C = {}, D, F, A;
    if (E != undefined) {
        for (F in E.post) {
            if (E.post.hasOwnProperty(F)) {
                D = F;
                while ((A = B.exec(D)) !== null) {
                    D = D.replace(A[0], String.fromCharCode(parseInt("0x" + A[1], 16)))
                }
                C[D] = E.post[F]
            }
        }
        E.post = C
    }
    return E
};
SWFUpload.prototype.swfuploadPreload = function () {
    var A;
    if (typeof this.settings.swfupload_preload_handler === "function") {
        A = this.settings.swfupload_preload_handler.call(this)
    } else {
        if (this.settings.swfupload_preload_handler != undefined) {
            throw"upload_start_handler must be a function"
        }
    }
    if (A === undefined) {
        A = true
    }
    return !!A
};
SWFUpload.prototype.flashReady = function () {
    var A = this.cleanUp();
    if (!A) {
        this.debug("Flash called back ready but the flash movie can't be found.");
        return
    }
    this.queueEvent("swfupload_loaded_handler")
};
SWFUpload.prototype.cleanUp = function () {
    var A, C = this.getMovieElement();
    try {
        if (C && typeof(C.CallFunction) === "unknown") {
            this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");
            for (A in C) {
                try {
                    if (typeof(C[A]) === "function") {
                        C[A] = null
                    }
                } catch (D) {
                }
            }
        }
    } catch (B) {
    }
    window["__flash__removeCallback"] = function (E, F) {
        try {
            if (E) {
                E[F] = null
            }
        } catch (G) {
        }
    };
    return C
};
SWFUpload.prototype.mouseClick = function () {
    this.queueEvent("mouse_click_handler")
};
SWFUpload.prototype.mouseOver = function () {
    this.queueEvent("mouse_over_handler")
};
SWFUpload.prototype.mouseOut = function () {
    this.queueEvent("mouse_out_handler")
};
SWFUpload.prototype.fileDialogStart = function () {
    this.queueEvent("file_dialog_start_handler")
};
SWFUpload.prototype.fileQueued = function (A) {
    A = this.unescapeFilePostParams(A);
    this.queueEvent("file_queued_handler", A)
};
SWFUpload.prototype.fileQueueError = function (C, B, A) {
    C = this.unescapeFilePostParams(C);
    this.queueEvent("file_queue_error_handler", [C, B, A])
};
SWFUpload.prototype.fileDialogComplete = function (C, B, A) {
    this.queueEvent("file_dialog_complete_handler", [C, B, A])
};
SWFUpload.prototype.uploadResizeStart = function (B, A) {
    B = this.unescapeFilePostParams(B);
    this.queueEvent("upload_resize_start_handler", [B, A.width, A.height, A.encoding, A.quality])
};
SWFUpload.prototype.uploadStart = function (A) {
    A = this.unescapeFilePostParams(A);
    this.queueEvent("return_upload_start_handler", A)
};
SWFUpload.prototype.returnUploadStart = function (B) {
    var A;
    if (typeof this.settings.upload_start_handler === "function") {
        B = this.unescapeFilePostParams(B);
        A = this.settings.upload_start_handler.call(this, B)
    } else {
        if (this.settings.upload_start_handler != undefined) {
            throw"upload_start_handler must be a function"
        }
    }
    if (A === undefined) {
        A = true
    }
    A = !!A;
    this.callFlash("ReturnUploadStart", [A])
};
SWFUpload.prototype.uploadProgress = function (B, A, C) {
    B = this.unescapeFilePostParams(B);
    this.queueEvent("upload_progress_handler", [B, A, C])
};
SWFUpload.prototype.uploadError = function (C, B, A) {
    C = this.unescapeFilePostParams(C);
    this.queueEvent("upload_error_handler", [C, B, A])
};
SWFUpload.prototype.uploadSuccess = function (C, B, A) {
    C = this.unescapeFilePostParams(C);
    this.queueEvent("upload_success_handler", [C, B, A])
};
SWFUpload.prototype.uploadComplete = function (A) {
    A = this.unescapeFilePostParams(A);
    this.queueEvent("upload_complete_handler", A)
};
SWFUpload.prototype.debug = function (A) {
    this.queueEvent("debug_handler", A)
};
SWFUpload.prototype.debugMessage = function (D) {
    var B, C, A;
    if (this.settings.debug) {
        C = [];
        if (typeof D === "object" && typeof D.name === "string" && typeof D.message === "string") {
            for (A in D) {
                if (D.hasOwnProperty(A)) {
                    C.push(A + ": " + D[A])
                }
            }
            B = C.join("\n") || "";
            C = B.split("\n");
            B = "EXCEPTION: " + C.join("\nEXCEPTION: ");
            SWFUpload.Console.writeLine(B)
        } else {
            SWFUpload.Console.writeLine(D)
        }
    }
};
SWFUpload.Console = {};
SWFUpload.Console.writeLine = function (D) {
    var A, B;
    try {
        A = document.getElementById("SWFUpload_Console");
        if (!A) {
            B = document.createElement("form");
            document.getElementsByTagName("body")[0].appendChild(B);
            A = document.createElement("textarea");
            A.id = "SWFUpload_Console";
            A.style.fontFamily = "monospace";
            A.setAttribute("wrap", "off");
            A.wrap = "off";
            A.style.overflow = "auto";
            A.style.width = "700px";
            A.style.height = "350px";
            A.style.margin = "5px";
            B.appendChild(A)
        }
        A.value += D + "\n";
        A.scrollTop = A.scrollHeight - A.clientHeight
    } catch (C) {
        alert("Exception: " + C.name + " Message: " + C.message)
    }
};
swfobject = function () {
    var At = "undefined", Ay = "object", Z = "Shockwave Flash", Ad = "ShockwaveFlash.ShockwaveFlash", AB = "application/x-shockwave-flash", Y = "SWFObjectExprInst", Aw = "onreadystatechange", Al = window, AG = document, AE = navigator, Ae = false, Af = [AI], AL = [], Ak = [], Aj = [], AM, Ab, Au, Ao, Ag = false, AQ = false, AK, As, AN = true, An = function () {
        var B = typeof AG.getElementById != At && typeof AG.getElementsByTagName != At && typeof AG.createElement != At, I = AE.userAgent.toLowerCase(), G = AE.platform.toLowerCase(), K = G ? /win/.test(G) : /win/.test(I), J = G ? /mac/.test(G) : /mac/.test(I), A = /webkit/.test(I) ? parseFloat(I.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, F = !+"\v1", E = [0, 0, 0], D = null;
        if (typeof AE.plugins != At && typeof AE.plugins[Z] == Ay) {
            D = AE.plugins[Z].description;
            if (D && !(typeof AE.mimeTypes != At && AE.mimeTypes[AB] && !AE.mimeTypes[AB].enabledPlugin)) {
                Ae = true;
                F = false;
                D = D.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                E[0] = parseInt(D.replace(/^(.*)\..*$/, "$1"), 10);
                E[1] = parseInt(D.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                E[2] = /[a-zA-Z]/.test(D) ? parseInt(D.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0
            }
        } else {
            if (typeof Al.ActiveXObject != At) {
                try {
                    var C = new ActiveXObject(Ad);
                    if (C) {
                        D = C.GetVariable("$version");
                        if (D) {
                            F = true;
                            D = D.split(" ")[1].split(",");
                            E = [parseInt(D[0], 10), parseInt(D[1], 10), parseInt(D[2], 10)]
                        }
                    }
                } catch (H) {
                }
            }
        }
        return {w3: B, pv: E, wk: A, ie: F, win: K, mac: J}
    }(), AH = function () {
        if (!An.w3) {
            return
        }
        if ((typeof AG.readyState != At && AG.readyState == "complete") || (typeof AG.readyState == At && (AG.getElementsByTagName("body")[0] || AG.body))) {
            AR()
        }
        if (!Ag) {
            if (typeof AG.addEventListener != At) {
                AG.addEventListener("DOMContentLoaded", AR, false)
            }
            if (An.ie && An.win) {
                AG.attachEvent(Aw, function () {
                    if (AG.readyState == "complete") {
                        AG.detachEvent(Aw, arguments.callee);
                        AR()
                    }
                });
                if (Al == top) {
                    (function () {
                        if (Ag) {
                            return
                        }
                        try {
                            AG.documentElement.doScroll("left")
                        } catch (A) {
                            setTimeout(arguments.callee, 0);
                            return
                        }
                        AR()
                    })()
                }
            }
            if (An.wk) {
                (function () {
                    if (Ag) {
                        return
                    }
                    if (!/loaded|complete/.test(AG.readyState)) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    AR()
                })()
            }
            Az(AR)
        }
    }();

    function AR() {
        if (Ag) {
            return
        }
        try {
            var A = AG.getElementsByTagName("body")[0].appendChild(Ap("span"));
            A.parentNode.removeChild(A)
        } catch (D) {
            return
        }
        Ag = true;
        var B = Af.length;
        for (var C = 0; C < B; C++) {
            Af[C]()
        }
    }

    function Ah(A) {
        if (Ag) {
            A()
        } else {
            Af[Af.length] = A
        }
    }

    function Az(B) {
        if (typeof Al.addEventListener != At) {
            Al.addEventListener("load", B, false)
        } else {
            if (typeof AG.addEventListener != At) {
                AG.addEventListener("load", B, false)
            } else {
                if (typeof Al.attachEvent != At) {
                    AJ(Al, "onload", B)
                } else {
                    if (typeof Al.onload == "function") {
                        var A = Al.onload;
                        Al.onload = function () {
                            A();
                            B()
                        }
                    } else {
                        Al.onload = B
                    }
                }
            }
        }
    }

    function AI() {
        if (Ae) {
            Ac()
        } else {
            Ai()
        }
    }

    function Ac() {
        var B = AG.getElementsByTagName("body")[0];
        var D = Ap(Ay);
        D.setAttribute("type", AB);
        var A = B.appendChild(D);
        if (A) {
            var C = 0;
            (function () {
                if (typeof A.GetVariable != At) {
                    var E = A.GetVariable("$version");
                    if (E) {
                        E = E.split(" ")[1].split(",");
                        An.pv = [parseInt(E[0], 10), parseInt(E[1], 10), parseInt(E[2], 10)]
                    }
                } else {
                    if (C < 10) {
                        C++;
                        setTimeout(arguments.callee, 10);
                        return
                    }
                }
                B.removeChild(D);
                A = null;
                Ai()
            })()
        } else {
            Ai()
        }
    }

    function Ai() {
        var A = AL.length;
        if (A > 0) {
            for (var L = 0; L < A; L++) {
                var F = AL[L].id;
                var D = AL[L].callbackFn;
                var B = {success: false, id: F};
                if (An.pv[0] > 0) {
                    var K = AP(F);
                    if (K) {
                        if (Ar(AL[L].swfVersion) && !(An.wk && An.wk < 312)) {
                            AD(F, true);
                            if (D) {
                                B.success = true;
                                B.ref = Av(F);
                                D(B)
                            }
                        } else {
                            if (AL[L].expressInstall && Aq()) {
                                var I = {};
                                I.data = AL[L].expressInstall;
                                I.width = K.getAttribute("width") || "0";
                                I.height = K.getAttribute("height") || "0";
                                if (K.getAttribute("class")) {
                                    I.styleclass = K.getAttribute("class")
                                }
                                if (K.getAttribute("align")) {
                                    I.align = K.getAttribute("align")
                                }
                                var H = {};
                                var E = K.getElementsByTagName("param");
                                var J = E.length;
                                for (var C = 0; C < J; C++) {
                                    if (E[C].getAttribute("name").toLowerCase() != "movie") {
                                        H[E[C].getAttribute("name")] = E[C].getAttribute("value")
                                    }
                                }
                                Aa(I, H, F, D)
                            } else {
                                AA(K);
                                if (D) {
                                    D(B)
                                }
                            }
                        }
                    }
                } else {
                    AD(F, true);
                    if (D) {
                        var G = Av(F);
                        if (G && typeof G.SetVariable != At) {
                            B.success = true;
                            B.ref = G
                        }
                        D(B)
                    }
                }
            }
        }
    }

    function Av(D) {
        var B = null;
        var C = AP(D);
        if (C && C.nodeName == "OBJECT") {
            if (typeof C.SetVariable != At) {
                B = C
            } else {
                var A = C.getElementsByTagName(Ay)[0];
                if (A) {
                    B = A
                }
            }
        }
        return B
    }

    function Aq() {
        return !AQ && Ar("6.0.65") && (An.win || An.mac) && !(An.wk && An.wk < 312)
    }

    function Aa(B, C, E, D) {
        AQ = true;
        Au = D || null;
        Ao = {success: false, id: E};
        var H = AP(E);
        if (H) {
            if (H.nodeName == "OBJECT") {
                AM = AS(H);
                Ab = null
            } else {
                AM = H;
                Ab = E
            }
            B.id = Y;
            if (typeof B.width == At || (!/%$/.test(B.width) && parseInt(B.width, 10) < 310)) {
                B.width = "310"
            }
            if (typeof B.height == At || (!/%$/.test(B.height) && parseInt(B.height, 10) < 137)) {
                B.height = "137"
            }
            AG.title = AG.title.slice(0, 47) + " - Flash Player Installation";
            var A = An.ie && An.win ? "ActiveX" : "PlugIn", G = "MMredirectURL=" + Al.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + A + "&MMdoctitle=" + AG.title;
            if (typeof C.flashvars != At) {
                C.flashvars += "&" + G
            } else {
                C.flashvars = G
            }
            if (An.ie && An.win && H.readyState != 4) {
                var F = Ap("div");
                E += "SWFObjectNew";
                F.setAttribute("id", E);
                H.parentNode.insertBefore(F, H);
                H.style.display = "none";
                (function () {
                    if (H.readyState == 4) {
                        H.parentNode.removeChild(H)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            }
            AF(B, C, E)
        }
    }

    function AA(B) {
        if (An.ie && An.win && B.readyState != 4) {
            var A = Ap("div");
            B.parentNode.insertBefore(A, B);
            A.parentNode.replaceChild(AS(B), A);
            B.style.display = "none";
            (function () {
                if (B.readyState == 4) {
                    B.parentNode.removeChild(B)
                } else {
                    setTimeout(arguments.callee, 10)
                }
            })()
        } else {
            B.parentNode.replaceChild(AS(B), B)
        }
    }

    function AS(A) {
        var F = Ap("div");
        if (An.win && An.ie) {
            F.innerHTML = A.innerHTML
        } else {
            var E = A.getElementsByTagName(Ay)[0];
            if (E) {
                var D = E.childNodes;
                if (D) {
                    var C = D.length;
                    for (var B = 0; B < C; B++) {
                        if (!(D[B].nodeType == 1 && D[B].nodeName == "PARAM") && !(D[B].nodeType == 8)) {
                            F.appendChild(D[B].cloneNode(true))
                        }
                    }
                }
            }
        }
        return F
    }

    function AF(I, A, G) {
        var F, B = AP(G);
        if (An.wk && An.wk < 312) {
            return F
        }
        if (B) {
            if (typeof I.id == At) {
                I.id = G
            }
            if (An.ie && An.win) {
                var H = "";
                for (var K in I) {
                    if (I[K] != Object.prototype[K]) {
                        if (K.toLowerCase() == "data") {
                            A.movie = I[K]
                        } else {
                            if (K.toLowerCase() == "styleclass") {
                                H += ' class="' + I[K] + '"'
                            } else {
                                if (K.toLowerCase() != "classid") {
                                    H += " " + K + '="' + I[K] + '"'
                                }
                            }
                        }
                    }
                }
                var L = "";
                for (var C in A) {
                    if (A[C] != Object.prototype[C]) {
                        L += '<param name="' + C + '" value="' + A[C] + '" />'
                    }
                }
                B.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + H + ">" + L + "</object>";
                Ak[Ak.length] = I.id;
                F = AP(I.id)
            } else {
                var E = Ap(Ay);
                E.setAttribute("type", AB);
                for (var J in I) {
                    if (I[J] != Object.prototype[J]) {
                        if (J.toLowerCase() == "styleclass") {
                            E.setAttribute("class", I[J])
                        } else {
                            if (J.toLowerCase() != "classid") {
                                E.setAttribute(J, I[J])
                            }
                        }
                    }
                }
                for (var D in A) {
                    if (A[D] != Object.prototype[D] && D.toLowerCase() != "movie") {
                        X(E, D, A[D])
                    }
                }
                B.parentNode.replaceChild(E, B);
                F = E
            }
        }
        return F
    }

    function X(A, B, C) {
        var D = Ap("param");
        D.setAttribute("name", B);
        D.setAttribute("value", C);
        A.appendChild(D)
    }

    function Ax(B) {
        var A = AP(B);
        if (A && A.nodeName == "OBJECT") {
            if (An.ie && An.win) {
                A.style.display = "none";
                (function () {
                    if (A.readyState == 4) {
                        AO(B)
                    } else {
                        setTimeout(arguments.callee, 10)
                    }
                })()
            } else {
                A.parentNode.removeChild(A)
            }
        }
    }

    function AO(A) {
        var C = AP(A);
        if (C) {
            for (var B in C) {
                if (typeof C[B] == "function") {
                    C[B] = null
                }
            }
            C.parentNode.removeChild(C)
        }
    }

    function AP(A) {
        var B = null;
        try {
            B = AG.getElementById(A)
        } catch (C) {
        }
        return B
    }

    function Ap(A) {
        return AG.createElement(A)
    }

    function AJ(A, B, C) {
        A.attachEvent(B, C);
        Aj[Aj.length] = [A, B, C]
    }

    function Ar(A) {
        var C = An.pv, B = A.split(".");
        B[0] = parseInt(B[0], 10);
        B[1] = parseInt(B[1], 10) || 0;
        B[2] = parseInt(B[2], 10) || 0;
        return (C[0] > B[0] || (C[0] == B[0] && C[1] > B[1]) || (C[0] == B[0] && C[1] == B[1] && C[2] >= B[2])) ? true : false
    }

    function AC(B, F, E, A) {
        if (An.ie && An.mac) {
            return
        }
        var G = AG.getElementsByTagName("head")[0];
        if (!G) {
            return
        }
        var D = (E && typeof E == "string") ? E : "screen";
        if (A) {
            AK = null;
            As = null
        }
        if (!AK || As != D) {
            var C = Ap("style");
            C.setAttribute("type", "text/css");
            C.setAttribute("media", D);
            AK = G.appendChild(C);
            if (An.ie && An.win && typeof AG.styleSheets != At && AG.styleSheets.length > 0) {
                AK = AG.styleSheets[AG.styleSheets.length - 1]
            }
            As = D
        }
        if (An.ie && An.win) {
            if (AK && typeof AK.addRule == Ay) {
                AK.addRule(B, F)
            }
        } else {
            if (AK && typeof AG.createTextNode != At) {
                AK.appendChild(AG.createTextNode(B + " {" + F + "}"))
            }
        }
    }

    function AD(A, B) {
        if (!AN) {
            return
        }
        var C = B ? "visible" : "hidden";
        if (Ag && AP(A)) {
            AP(A).style.visibility = C
        } else {
            AC("#" + A, "visibility:" + C)
        }
    }

    function Am(C) {
        var A = /[\\\"<>\.;]/;
        var B = A.exec(C) != null;
        return B && typeof encodeURIComponent != At ? encodeURIComponent(C) : C
    }

    var AT = function () {
        if (An.ie && An.win) {
            window.attachEvent("onunload", function () {
                var B = Aj.length;
                for (var A = 0; A < B; A++) {
                    Aj[A][0].detachEvent(Aj[A][1], Aj[A][2])
                }
                var C = Ak.length;
                for (var F = 0; F < C; F++) {
                    Ax(Ak[F])
                }
                for (var E in An) {
                    An[E] = null
                }
                An = null;
                for (var D in swfobject) {
                    swfobject[D] = null
                }
                swfobject = null
            })
        }
    }();
    return {
        registerObject: function (A, C, E, B) {
            if (An.w3 && A && C) {
                var D = {};
                D.id = A;
                D.swfVersion = C;
                D.expressInstall = E;
                D.callbackFn = B;
                AL[AL.length] = D;
                AD(A, false)
            } else {
                if (B) {
                    B({success: false, id: A})
                }
            }
        }, getObjectById: function (A) {
            if (An.w3) {
                return Av(A)
            }
        }, embedSWF: function (I, H, J, A, F, B, D, C, K, E) {
            var G = {success: false, id: H};
            if (An.w3 && !(An.wk && An.wk < 312) && I && H && J && A && F) {
                AD(H, false);
                Ah(function () {
                    J += "";
                    A += "";
                    var O = {};
                    if (K && typeof K === Ay) {
                        for (var Q in K) {
                            O[Q] = K[Q]
                        }
                    }
                    O.data = I;
                    O.width = J;
                    O.height = A;
                    var L = {};
                    if (C && typeof C === Ay) {
                        for (var P in C) {
                            L[P] = C[P]
                        }
                    }
                    if (D && typeof D === Ay) {
                        for (var M in D) {
                            if (typeof L.flashvars != At) {
                                L.flashvars += "&" + M + "=" + D[M]
                            } else {
                                L.flashvars = M + "=" + D[M]
                            }
                        }
                    }
                    if (Ar(F)) {
                        var N = AF(O, L, H);
                        if (O.id == H) {
                            AD(H, true)
                        }
                        G.success = true;
                        G.ref = N
                    } else {
                        if (B && Aq()) {
                            O.data = B;
                            Aa(O, L, H, E);
                            return
                        } else {
                            AD(H, true)
                        }
                    }
                    if (E) {
                        E(G)
                    }
                })
            } else {
                if (E) {
                    E(G)
                }
            }
        }, switchOffAutoHideShow: function () {
            AN = false
        }, ua: An, getFlashPlayerVersion: function () {
            return {major: An.pv[0], minor: An.pv[1], release: An.pv[2]}
        }, hasFlashPlayerVersion: Ar, createSWF: function (A, C, B) {
            if (An.w3) {
                return AF(A, C, B)
            } else {
                return undefined
            }
        }, showExpressInstall: function (A, D, B, C) {
            if (An.w3 && Aq()) {
                Aa(A, D, B, C)
            }
        }, removeSWF: function (A) {
            if (An.w3) {
                Ax(A)
            }
        }, createCSS: function (D, A, C, B) {
            if (An.w3) {
                AC(D, A, C, B)
            }
        }, addDomLoadEvent: Ah, addLoadEvent: Az, getQueryParamValue: function (D) {
            var A = AG.location.search || AG.location.hash;
            if (A) {
                if (/\?/.test(A)) {
                    A = A.split("?")[1]
                }
                if (D == null) {
                    return Am(A)
                }
                var C = A.split("&");
                for (var B = 0; B < C.length; B++) {
                    if (C[B].substring(0, C[B].indexOf("=")) == D) {
                        return Am(C[B].substring((C[B].indexOf("=") + 1)))
                    }
                }
            }
            return ""
        }, expressInstallCallback: function () {
            if (AQ) {
                var A = AP(Y);
                if (A && AM) {
                    A.parentNode.replaceChild(AM, A);
                    if (Ab) {
                        AD(Ab, true);
                        if (An.ie && An.win) {
                            AM.style.display = "block"
                        }
                    }
                    if (Au) {
                        Au(Ao)
                    }
                }
                AQ = false
            }
        }
    }
}();
swfobject.addDomLoadEvent(function () {
    if (typeof(SWFUpload.onload) === "function") {
        SWFUpload.onload.call(window)
    }
});
var SWFUpload;
if (typeof(SWFUpload) === "function") {
    SWFUpload.queue = {};
    SWFUpload.prototype.initSettings = (function (A) {
        return function (B) {
            if (typeof(A) === "function") {
                A.call(this, B)
            }
            this.queueSettings = {};
            this.queueSettings.queue_cancelled_flag = false;
            this.queueSettings.queue_upload_count = 0;
            this.queueSettings.user_upload_complete_handler = this.settings.upload_complete_handler;
            this.queueSettings.user_upload_start_handler = this.settings.upload_start_handler;
            this.settings.upload_complete_handler = SWFUpload.queue.uploadCompleteHandler;
            this.settings.upload_start_handler = SWFUpload.queue.uploadStartHandler;
            this.settings.queue_complete_handler = B.queue_complete_handler || null
        }
    })(SWFUpload.prototype.initSettings);
    SWFUpload.prototype.startUpload = function (A) {
        this.queueSettings.queue_cancelled_flag = false;
        this.callFlash("StartUpload", [A])
    };
    SWFUpload.prototype.cancelQueue = function () {
        this.queueSettings.queue_cancelled_flag = true;
        this.stopUpload();
        var A = this.getStats();
        while (A.files_queued > 0) {
            this.cancelUpload();
            A = this.getStats()
        }
    };
    SWFUpload.queue.uploadStartHandler = function (B) {
        var A;
        if (typeof(this.queueSettings.user_upload_start_handler) === "function") {
            A = this.queueSettings.user_upload_start_handler.call(this, B)
        }
        A = (A === false) ? false : true;
        this.queueSettings.queue_cancelled_flag = !A;
        return A
    };
    SWFUpload.queue.uploadCompleteHandler = function (D) {
        var B = this.queueSettings.user_upload_complete_handler;
        var C;
        if (D.filestatus === SWFUpload.FILE_STATUS.COMPLETE) {
            this.queueSettings.queue_upload_count++
        }
        if (typeof(B) === "function") {
            C = (B.call(this, D) === false) ? false : true
        } else {
            if (D.filestatus === SWFUpload.FILE_STATUS.QUEUED) {
                C = false
            } else {
                C = true
            }
        }
        if (C) {
            var A = this.getStats();
            if (A.files_queued > 0 && this.queueSettings.queue_cancelled_flag === false) {
                this.startUpload()
            } else {
                if (this.queueSettings.queue_cancelled_flag === false) {
                    this.queueEvent("queue_complete_handler", [this.queueSettings.queue_upload_count]);
                    this.queueSettings.queue_upload_count = 0
                } else {
                    this.queueSettings.queue_cancelled_flag = false;
                    this.queueSettings.queue_upload_count = 0
                }
            }
        }
    }
}
;/*
 A simple class for displaying file information and progress
 Note: This is a demonstration only and not part of SWFUpload.
 Note: Some have had problems adapting this class in IE7. It may not be suitable for your application.
 */
// Constructor
// file is a SWFUpload file object
// targetID is the HTML element id attribute that the FileProgress HTML structure will be added to.
// Instantiating a new FileProgress object with an existing file will reuse/update the existing DOM elements
function FileProgress(file, targetID) {
    this.fileProgressID = file.id;
    this.opacity = 100;
    this.height = 0;

    this.fileProgressWrapper = document.getElementById(this.fileProgressID);
    if (!this.fileProgressWrapper) {
        this.fileProgressWrapper = document.createElement("div");
        this.fileProgressWrapper.className = "progressWrapper";
        this.fileProgressWrapper.id = this.fileProgressID;

        this.fileProgressElement = document.createElement("div");
        this.fileProgressElement.className = "progressContainer";

        var progressCancel = document.createElement("a");
        progressCancel.className = "progressCancel";
        progressCancel.href = "#";
        progressCancel.style.visibility = "hidden";
        progressCancel.appendChild(document.createTextNode(" "));

        var progressText = document.createElement("div");
        progressText.className = "progressName pl35";
        progressText.appendChild(document.createTextNode(file.name));

        var progressBar = document.createElement("div");
        progressBar.className = "progressBarInProgress pbline";

        var dgprogressBar = document.createElement("div");
        dgprogressBar.className = "dgprogressBar mt50";
        progressBar.appendChild(dgprogressBar);

        var progressStatus = document.createElement("div");
        progressStatus.className = "progressBarStatus";
        progressStatus.innerHTML = "&nbsp;";

        this.fileProgressElement.appendChild(progressCancel);
        this.fileProgressElement.appendChild(progressStatus);
        this.fileProgressElement.appendChild(progressBar);
        this.fileProgressElement.appendChild(progressText);
        this.fileProgressWrapper.appendChild(this.fileProgressElement);
        var tmp = $('<div />').addClass('prtp').append('<input type="text" value="标题(不超过20个汉字)" class="crijtext mb10 r3" onfocus="if(this.value==\'标题(不超过20个汉字)\') {this.value=\'\'; $(this).addClass(\'fcbm\'); }" onblur="if(!this.value) {this.value=\'标题(不超过20个汉字)\';$(this).removeClass(\'fcbm\');}" ><input type="hidden" value="" id="coverImageUrl" class="dietimage" name="coverImageUrl">');
        tmp.append($(this.fileProgressWrapper));
        tmp.append('<div class="piic hidden"><div class="timg"><img src="" class="dietimage aa"></div><span class="btnclrj obclose" onclick="deldietimg($(this))"></span></div>');
        if ($('#' + targetID).find('.prtp').size() > 0) {
            $('#' + targetID).find('.prtp:last').after(tmp);
        } else {
            $('#' + targetID).prepend(tmp);
        }
    } else {
        this.fileProgressElement = $(this.fileProgressWrapper).find('.progressContainer:first')[0];
        this.reset();
    }
    this.height = this.fileProgressWrapper.offsetHeight;
    this.setTimer(null);
}

FileProgress.prototype.setTimer = function (timer) {
    this.fileProgressElement["FP_TIMER"] = timer;
};

FileProgress.prototype.getTimer = function (timer) {
    return this.fileProgressElement["FP_TIMER"] || null;
};

FileProgress.prototype.reset = function () {
    this.fileProgressElement.className = "progressContainer";
    this.fileProgressElement.childNodes[1].innerHTML = "&nbsp;";
    this.fileProgressElement.childNodes[1].className = "progressBarStatus";
    this.fileProgressElement.childNodes[2].className = "progressBarInProgress pbline";
    this.appear();
};

FileProgress.prototype.setProgress = function (percentage) {
    this.fileProgressElement.className = "progressContainer green";
    this.fileProgressElement.childNodes[2].childNodes[0].style.width = percentage + "%";
    this.appear();
};

FileProgress.prototype.setComplete = function () {
    this.fileProgressElement.className = "progressContainer blue";
    this.fileProgressElement.childNodes[2].className = "progressBarComplete";
    this.fileProgressElement.childNodes[2].style.width = "";
    /*
     var oSelf = this;
     this.setTimer(setTimeout(function () {
     oSelf.disappear();
     }, 10000));
     */
};

FileProgress.prototype.setError = function () {
    this.fileProgressElement.className = "progressContainer red";
    this.fileProgressElement.childNodes[2].className = "progressBarError";
    this.fileProgressElement.childNodes[2].style.width = "";

    var oSelf = this;
    this.setTimer(setTimeout(function () {
        oSelf.disappear();
    }, 5000));
};

FileProgress.prototype.setCancelled = function () {
    this.fileProgressElement.className = "progressContainer";
    this.fileProgressElement.childNodes[2].className = "progressBarError";
    this.fileProgressElement.childNodes[2].style.width = "";
    var oSelf = this;
    this.setTimer(setTimeout(function () {
        oSelf.disappear();
    }, 2000));
};

FileProgress.prototype.setStatus = function (status) {
    this.fileProgressElement.childNodes[1].innerHTML = status;
};

// Show/Hide the cancel button
FileProgress.prototype.toggleCancel = function (show, swfUploadInstance) {
    this.fileProgressElement.childNodes[0].style.visibility = show ? "visible" : "hidden";
    if (swfUploadInstance) {
        var fileID = this.fileProgressID;
        this.fileProgressElement.childNodes[0].onclick = function () {
            swfUploadInstance.cancelUpload(fileID);
            return false;
        };
    }
};

FileProgress.prototype.appear = function () {
    if (this.getTimer() !== null) {
        clearTimeout(this.getTimer());
        this.setTimer(null);
    }
    if (this.fileProgressWrapper.filters) {
        try {
            this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity = 100;
        } catch (e) {
            // If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
            this.fileProgressWrapper.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=100)";
        }
    } else {
        this.fileProgressWrapper.style.opacity = 1;
    }

    this.fileProgressWrapper.style.height = "";
    this.height = this.fileProgressWrapper.offsetHeight;
    this.opacity = 100;
    this.fileProgressWrapper.style.display = "";
};

// Fades out and clips away the FileProgress box.
FileProgress.prototype.disappear = function () {
    var reduceOpacityBy = 15;
    var reduceHeightBy = 4;
    var rate = 30;	// 15 fps
    ifs(this.opacity > 0)
    {
        this.opacity -= reduceOpacityBy;
        if (this.opacity < 0) {
            this.opacity = 0;
        }
        if (this.fileProgressWrapper.filters) {
            try {
                this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity = this.opacity;
            } catch (e) {
                // If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
                this.fileProgressWrapper.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + this.opacity + ")";
            }
        } else {
            this.fileProgressWrapper.style.opacity = this.opacity / 100;
        }
    }
    if (this.height > 0) {
        this.height -= reduceHeightBy;
        if (this.height < 0) {
            this.height = 0;
        }
        this.fileProgressWrapper.style.height = this.height + "px";
    }
    if (this.height > 0 || this.opacity > 0) {
        var oSelf = this;
        this.setTimer(setTimeout(function () {
            oSelf.disappear();
        }, rate));
    } else {
        this.fileProgressWrapper.style.display = "none";
        this.setTimer(null);
    }
};

//设置返回json 并回显图片
FileProgress.prototype.setShowImage = function (result) {
    var res = eval('(' + result + ')');
    if (res.status == 'OK') {
        var tmpobj = $(this.fileProgressElement);
        tmpobj.parents('.progressWrapper').prev('.dietimage').val(res.data.upload);
        tmpobj.parents('.progressWrapper').next('.piic').find('img').attr('src', res.data.imgUrl);
        $(".prtp:gt(0)").remove();
        tmpobj.parent().fadeOut('300', function () {
            tmpobj.parents('.prtp').find('.piic').fadeIn('300');
        })

    } else {
        if (res.data == 'shibai') {
            alert('上传失败！');
            $(this.fileProgressElement).parents('.prtp').remove();
        } else {
            //showError('上传失败');
            alert('图片大小不能超过8M!');
            $(this.fileProgressElement).parents('.prtp').remove();
        }
    }
}
/**
 * @desc: 创建菜谱
 * @time:2012-06-22
 **/
$(function () {
    // 图片滚动特效代码
    if (!$('#slidepic')[0]) return;
    var i = 0,
        p = $('#slidepic ul'),
        pList = $('#slidepic ul li'),
        len = pList.length;
    var eleprev = $('#prev'),
        eleNext = $('#next');
    //var firstClick = false;
    var w = 64,
        num = 5;
    p.css('width', w * len);
    if (len <= num) eleNext.addClass('gray');
    function prev() {
        if (eleprev.hasClass('gray')) {
            //alert('已经是第一张了');
            return;
        }
        p.animate({
                marginTop: -(--i) * w
            },
            500);
        if (i < len - num) {
            eleNext.removeClass('gray');
        }
        if (i == 0) {
            eleprev.addClass('gray');
        }
    }

    function next() {
        if (eleNext.hasClass('gray')) {
            //alert('已经是最后一张了');
            return;
        }
        //p.css('margin-left',-(++i) * w);
        p.animate({
                marginTop: -(++i) * w
            },
            500);
        if (i != 0) {
            eleprev.removeClass('gray');
        }
        if (i == len - num) {
            eleNext.addClass('gray');
        }
    }

    eleprev.bind('click', prev);
    eleNext.bind('click', next);
    pList.each(function (n, v) {
        $(this).click(function () {
            if (n - i == 2) {
                next();
            }
            if (n - i == 0) {
                prev()
            }
            $('#slidepic ul li.cur').removeClass('cur');
            $(this).addClass('cur');
            show(n);
        }).mouseover(function () {
            $(this).addClass('hover');
        }).mouseout(function () {
            $(this).removeClass('hover');
        })
    });
    function show(i) {
        var ad = areaDailyList[i];
        $('#dailyImage').attr('src', ad.image);
    }


});
$(document).ready(function () {
    var swfu = new SWFUpload(settings);
    var swfu2 = new SWFUpload(settings2);
});
/**
 * @desc: 初始化上传控件的各种参数
 **/
var settings = {
    flash_url: "/static/js/swfupload.swf",
    flash9_url: "/static/js/swfupload_fp9.swf",
    upload_url: "/uajax/addrecipeimg",
    hideUploadBt: true,
    file_size_limit: "8MB",
    file_post_name: 'dietimg',
    file_types: "*.png;*.jpg;*.gif",
    file_types_description: "png,jpg,gif",
    file_upload_limit: 12,
    file_queue_limit: 0,
    custom_settings: {
        progressTarget: "fsUploadProgress"
    },
    debug: false,
    button_width: "600",
    button_height: "400",
    button_placeholder_id: "swfbtn",
    button_text: '<span class="theFont"></span>',
    button_text_style: ".theFont { font-size: 16px;}",
    button_text_left_padding: 12,
    button_text_top_padding: 3,
    button_cursor: SWFUpload.CURSOR.HAND,

    swfupload_preload_handler: preLoad,
    swfupload_load_failed_handler: loadFailed,
    file_queued_handler: fileQueued,
    file_queue_error_handler: fileQueueErrorNew,
    file_dialog_complete_handler: fileDialogComplete,
    upload_start_handler: uploadStart,
    upload_progress_handler: uploadProgress,
    upload_error_handler: uploadError,
    upload_success_handler: uploadSuccess,
    upload_complete_handler: uploadCompleteNew,
    queue_complete_handler: queueComplete
};
var settings2 = {
    flash_url: "/static/js/swfupload.swf",
    flash9_url: "/static/js/swfupload_fp9.swf",
    upload_url: "/uajax/addbuzhouimg",
    hideUploadBt: true,
    file_size_limit: "7MB",
    file_post_name: 'dietimg',
    file_types: "*.png;*.jpg;*.gif",
    file_types_description: "png,jpg,gif",
    file_upload_limit: 30,
    file_queue_limit: 0,
    debug: false,
    button_width: "70",
    button_height: "30",
    button_placeholder_id: "swfbtn2",
    button_text: '<span class="theFont"></span>',
    button_text_style: ".theFont { font-size: 16px;}",
    button_text_left_padding: 12,
    button_text_top_padding: 3,
    button_cursor: SWFUpload.CURSOR.HAND,

    swfupload_preload_handler: preLoad,
    swfupload_load_failed_handler: loadFailed,
    file_queued_handler: fileQueued,
    file_queue_error_handler: fileQueueErrorNew,
    file_dialog_complete_handler: fileDialogComplete,
    upload_start_handler: uploadStart,
    upload_progress_handler: uploadProgress,
    upload_error_handler: uploadError,
    upload_success_handler: uploadSuccess2,
    upload_complete_handler: uploadCompleteNew,
    queue_complete_handler: queueComplete
};

var swfu;
var info = {
    current: 1,
    getTarget: function () {
        return 'fsUploadProgress_' + (info.current++);
    },
    getUploadHtml: function () {
        var html = $('<div class="prtp"><div id="fsUploadProgress_0" class="piic hidden"><div class="xpity"><img src="" class="dietimg"/><span class="btnclrj obclose"></span></div></div></div>');
        var tag = info.getTarget();
        html.find('.swfimage').attr('id', tag);
        return html;
    },
    getAddHtml: function () {
        var html = $('');
        $('.add').find('.addmore').before(html);
    }
}
/**
 * @desc: 删除某一个美食日记图片
 **/
function deldietimg(obj) {
    $(obj).parents('.prtp').remove();
}

/**
 * @desc:判断图片是否上传完成
 **/
function isuploading() {
    return $('.picgrem:visible').size() > 0 ? true : false;
}

/**
 * @desc: 错误提示信息
 * @param tips
 **/
function showerrorinfos(tips) {
    $("#dieterrorinfo").html(tips).show();
}
function backToTop(num) {
    var num = typeof num == 'undefined' ? 0 : num;
    if (num == 0) {
        t = $(document).scrollTop();
        num = t;
    }
    var t = $(document).scrollTop();
    $(document).scrollTop(t - num);
}

/**
 *    @DESC swfupload 上传队列自定义处理方法。主要自定出错信息
 *    @author cntnn11
 *    @date 2013-10-08
 */
function fileQueueErrorNew(file, errorCode, message) {
    try {
        switch (errorCode) {
            case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                alert("批量上传不允许超过30张。如仍有需要，请点击步骤图区域单张上传");
                break;
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                alert('您上传的文件太大了');
                break;
            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                alert('图片格式不正确！');
                break;
            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
            default:
                alert('上传的文件未识别');
                break;
        }
    }
    catch (ex) {
        this.debug(ex);
    }
}
/**
 *    @DESC 图片上传成功后的处理。只是把错误提示内容给清空了
 *    @author cntnn11
 *    @date 2013-10-08
 */
function uploadCompleteNew(file) {
    showerrorinfos('');
    /*if (this.getStats().files_queued === 0) {
     //	document.getElementById(this.customSettings.cancelButtonId).disabled = true;
     }*/
}
var j = 0;
function uploadSuccess2(D, B) {
    var res = eval("(" + B + ")");
    if (res.status == 'OK') {
        if (j > 2) {
            var html = addBuZhou();
            $("#phonetic1").append(html);
            resortStepPosition();
            var obj = $("#phonetic1 li:last-child").children().children("div:first");
            uploadStepImgOne(obj);
        }
        $('#phonetic1 li').eq(j).find('.tjbz').hide();
        $('#phonetic1 li').eq(j).find('.upimgsucc').find('img').attr('src', res.data.imgurl);
        $('#phonetic1 li').eq(j).find('.upimgsucc').find('img').next('input').val(res.data.upload);
        $('#phonetic1 li').eq(j).find('.upimgsucc').find('img').show();
        $('#phonetic1 li').eq(j).find('.upimgsucc').show();
        j++;
    } else {
        if (res.data == 'shibai') {
            alert('上传失败！');
        } else {
            //showError('上传失败');
            alert('图片大小不能超过8M!');
        }
    }
}
