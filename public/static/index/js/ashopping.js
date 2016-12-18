var SWFUpload;var swfobject;if(SWFUpload==undefined){SWFUpload=function(A){this.initSWFUpload(A)}}SWFUpload.prototype.initSWFUpload=function(B){try{this.customSettings={};this.settings={};this.eventQueue=[];this.movieName="SWFUpload_"+SWFUpload.movieCount++;this.movieElement=null;SWFUpload.instances[this.movieName]=this;this.initSettings(B);this.loadSupport();if(this.swfuploadPreload()){this.loadFlash()}this.displayDebugInfo()}catch(A){delete SWFUpload.instances[this.movieName];throw A}};SWFUpload.instances={};SWFUpload.movieCount=0;SWFUpload.version="2.5.0 2010-01-15 Beta 2";SWFUpload.QUEUE_ERROR={QUEUE_LIMIT_EXCEEDED:-100,FILE_EXCEEDS_SIZE_LIMIT:-110,ZERO_BYTE_FILE:-120,INVALID_FILETYPE:-130};SWFUpload.UPLOAD_ERROR={HTTP_ERROR:-200,MISSING_UPLOAD_URL:-210,IO_ERROR:-220,SECURITY_ERROR:-230,UPLOAD_LIMIT_EXCEEDED:-240,UPLOAD_FAILED:-250,SPECIFIED_FILE_ID_NOT_FOUND:-260,FILE_VALIDATION_FAILED:-270,FILE_CANCELLED:-280,UPLOAD_STOPPED:-290,RESIZE:-300};SWFUpload.FILE_STATUS={QUEUED:-1,IN_PROGRESS:-2,ERROR:-3,COMPLETE:-4,CANCELLED:-5};SWFUpload.UPLOAD_TYPE={NORMAL:-1,RESIZED:-2};SWFUpload.BUTTON_ACTION={SELECT_FILE:-100,SELECT_FILES:-110,START_UPLOAD:-120,JAVASCRIPT:-130,NONE:-130};SWFUpload.CURSOR={ARROW:-1,HAND:-2};SWFUpload.WINDOW_MODE={WINDOW:"window",TRANSPARENT:"transparent",OPAQUE:"opaque"};SWFUpload.RESIZE_ENCODING={JPEG:-1,PNG:-2};SWFUpload.completeURL=function(B){try{var D="",A=-1;if(typeof(B)!=="string"||B.match(/^https?:\/\//i)||B.match(/^\//)||B===""){return B}A=window.location.pathname.lastIndexOf("/");if(A<=0){D="/"}else{D=window.location.pathname.substr(0,A)+"/"}return D+B}catch(C){return B}};SWFUpload.onload=function(){};SWFUpload.prototype.initSettings=function(A){this.ensureDefault=function(B,D){var C=A[B];if(C!=undefined){this.settings[B]=C}else{this.settings[B]=D}};this.ensureDefault("upload_url","");this.ensureDefault("preserve_relative_urls",false);this.ensureDefault("file_post_name","Filedata");this.ensureDefault("post_params",{});this.ensureDefault("use_query_string",false);this.ensureDefault("requeue_on_error",false);this.ensureDefault("http_success",[]);this.ensureDefault("assume_success_timeout",0);this.ensureDefault("file_types","*.*");this.ensureDefault("file_types_description","All Files");this.ensureDefault("file_size_limit",0);this.ensureDefault("file_upload_limit",0);this.ensureDefault("file_queue_limit",0);this.ensureDefault("flash_url","swfupload.swf");this.ensureDefault("flash9_url","swfupload_fp9.swf");this.ensureDefault("prevent_swf_caching",true);this.ensureDefault("button_image_url","");this.ensureDefault("button_width",1);this.ensureDefault("button_height",1);this.ensureDefault("button_text","");this.ensureDefault("button_text_style","color: #000000; font-size: 16pt;");this.ensureDefault("button_text_top_padding",0);this.ensureDefault("button_text_left_padding",0);this.ensureDefault("button_action",SWFUpload.BUTTON_ACTION.SELECT_FILES);this.ensureDefault("button_disabled",false);this.ensureDefault("button_placeholder_id","");this.ensureDefault("button_placeholder",null);this.ensureDefault("button_cursor",SWFUpload.CURSOR.ARROW);this.ensureDefault("button_window_mode",SWFUpload.WINDOW_MODE.TRANSPARENT);this.ensureDefault("debug",false);this.settings.debug_enabled=this.settings.debug;this.settings.return_upload_start_handler=this.returnUploadStart;this.ensureDefault("swfupload_preload_handler",null);this.ensureDefault("swfupload_load_failed_handler",null);this.ensureDefault("swfupload_loaded_handler",null);this.ensureDefault("file_dialog_start_handler",null);this.ensureDefault("file_queued_handler",null);this.ensureDefault("file_queue_error_handler",null);this.ensureDefault("file_dialog_complete_handler",null);this.ensureDefault("upload_resize_start_handler",null);this.ensureDefault("upload_start_handler",null);this.ensureDefault("upload_progress_handler",null);this.ensureDefault("upload_error_handler",null);this.ensureDefault("upload_success_handler",null);this.ensureDefault("upload_complete_handler",null);this.ensureDefault("mouse_click_handler",null);this.ensureDefault("mouse_out_handler",null);this.ensureDefault("mouse_over_handler",null);this.ensureDefault("debug_handler",this.debugMessage);this.ensureDefault("custom_settings",{});this.customSettings=this.settings.custom_settings;if(!!this.settings.prevent_swf_caching){this.settings.flash_url=this.settings.flash_url+(this.settings.flash_url.indexOf("?")<0?"?":"&")+"preventswfcaching="+new Date().getTime();this.settings.flash9_url=this.settings.flash9_url+(this.settings.flash9_url.indexOf("?")<0?"?":"&")+"preventswfcaching="+new Date().getTime()}if(!this.settings.preserve_relative_urls){this.settings.upload_url=SWFUpload.completeURL(this.settings.upload_url);this.settings.button_image_url=SWFUpload.completeURL(this.settings.button_image_url)}delete this.ensureDefault};SWFUpload.prototype.loadSupport=function(){this.support={loading:swfobject.hasFlashPlayerVersion("9.0.28"),imageResize:swfobject.hasFlashPlayerVersion("10.0.0")}};SWFUpload.prototype.loadFlash=function(){var D,C,E,F,A;if(!this.support.loading){this.queueEvent("swfupload_load_failed_handler",["Flash Player doesn't support SWFUpload"]);return}if(document.getElementById(this.movieName)!==null){this.support.loading=false;this.queueEvent("swfupload_load_failed_handler",["Element ID already in use"]);return}D=document.getElementById(this.settings.button_placeholder_id)||this.settings.button_placeholder;if(D==undefined){this.support.loading=false;this.queueEvent("swfupload_load_failed_handler",["button place holder not found"]);return}E=(D.currentStyle&&D.currentStyle["display"]||window.getComputedStyle&&document.defaultView.getComputedStyle(D,null).getPropertyValue("display"))!=="block"?"span":"div";C=document.createElement(E);F=this.getFlashHTML();try{C.innerHTML=F}catch(B){this.support.loading=false;this.queueEvent("swfupload_load_failed_handler",["Exception loading Flash HTML into placeholder"]);return}A=C.getElementsByTagName("object");if(!A||A.length>1||A.length===0){this.support.loading=false;this.queueEvent("swfupload_load_failed_handler",["Unable to find movie after adding to DOM"]);return}else{if(A.length===1){this.movieElement=A[0]}}D.parentNode.replaceChild(C.firstChild,D);if(window[this.movieName]==undefined){window[this.movieName]=this.getMovieElement()}};SWFUpload.prototype.getFlashHTML=function(A){return['<object id="',this.movieName,'" type="application/x-shockwave-flash" data="',(this.support.imageResize?this.settings.flash_url:this.settings.flash9_url),'" width="',this.settings.button_width,'" height="',this.settings.button_height,'" class="swfupload">','<param name="wmode" value="',this.settings.button_window_mode,'" />','<param name="movie" value="',(this.support.imageResize?this.settings.flash_url:this.settings.flash9_url),'" />','<param name="quality" value="high" />','<param name="allowScriptAccess" value="always" />','<param name="flashvars" value="'+this.getFlashVars()+'" />',"</object>"].join("")};SWFUpload.prototype.getFlashVars=function(){var A,B;B=this.buildParamString();A=this.settings.http_success.join(",");return["movieName=",encodeURIComponent(this.movieName),"&amp;uploadURL=",encodeURIComponent(this.settings.upload_url),"&amp;useQueryString=",encodeURIComponent(this.settings.use_query_string),"&amp;requeueOnError=",encodeURIComponent(this.settings.requeue_on_error),"&amp;httpSuccess=",encodeURIComponent(A),"&amp;assumeSuccessTimeout=",encodeURIComponent(this.settings.assume_success_timeout),"&amp;params=",encodeURIComponent(B),"&amp;filePostName=",encodeURIComponent(this.settings.file_post_name),"&amp;fileTypes=",encodeURIComponent(this.settings.file_types),"&amp;fileTypesDescription=",encodeURIComponent(this.settings.file_types_description),"&amp;fileSizeLimit=",encodeURIComponent(this.settings.file_size_limit),"&amp;fileUploadLimit=",encodeURIComponent(this.settings.file_upload_limit),"&amp;fileQueueLimit=",encodeURIComponent(this.settings.file_queue_limit),"&amp;debugEnabled=",encodeURIComponent(this.settings.debug_enabled),"&amp;buttonImageURL=",encodeURIComponent(this.settings.button_image_url),"&amp;buttonWidth=",encodeURIComponent(this.settings.button_width),"&amp;buttonHeight=",encodeURIComponent(this.settings.button_height),"&amp;buttonText=",encodeURIComponent(this.settings.button_text),"&amp;buttonTextTopPadding=",encodeURIComponent(this.settings.button_text_top_padding),"&amp;buttonTextLeftPadding=",encodeURIComponent(this.settings.button_text_left_padding),"&amp;buttonTextStyle=",encodeURIComponent(this.settings.button_text_style),"&amp;buttonAction=",encodeURIComponent(this.settings.button_action),"&amp;buttonDisabled=",encodeURIComponent(this.settings.button_disabled),"&amp;buttonCursor=",encodeURIComponent(this.settings.button_cursor)].join("")};SWFUpload.prototype.getMovieElement=function(){if(this.movieElement==undefined){this.movieElement=document.getElementById(this.movieName)}if(this.movieElement===null){throw"Could not find Flash element"}return this.movieElement};SWFUpload.prototype.buildParamString=function(){var C,B,A=[];B=this.settings.post_params;if(typeof(B)==="object"){for(C in B){if(B.hasOwnProperty(C)){A.push(encodeURIComponent(C.toString())+"="+encodeURIComponent(B[C].toString()))}}}return A.join("&amp;")};SWFUpload.prototype.destroy=function(){var A;try{this.cancelUpload(null,false);A=this.cleanUp();if(A){try{A.parentNode.removeChild(A)}catch(C){}}window[this.movieName]=null;SWFUpload.instances[this.movieName]=null;delete SWFUpload.instances[this.movieName];this.movieElement=null;this.settings=null;this.customSettings=null;this.eventQueue=null;this.movieName=null;return true}catch(B){return false}};SWFUpload.prototype.displayDebugInfo=function(){this.debug(["---SWFUpload Instance Info---\n","Version: ",SWFUpload.version,"\n","Movie Name: ",this.movieName,"\n","Settings:\n","\t","upload_url:               ",this.settings.upload_url,"\n","\t","flash_url:                ",this.settings.flash_url,"\n","\t","flash9_url:                ",this.settings.flash9_url,"\n","\t","use_query_string:         ",this.settings.use_query_string.toString(),"\n","\t","requeue_on_error:         ",this.settings.requeue_on_error.toString(),"\n","\t","http_success:             ",this.settings.http_success.join(", "),"\n","\t","assume_success_timeout:   ",this.settings.assume_success_timeout,"\n","\t","file_post_name:           ",this.settings.file_post_name,"\n","\t","post_params:              ",this.settings.post_params.toString(),"\n","\t","file_types:               ",this.settings.file_types,"\n","\t","file_types_description:   ",this.settings.file_types_description,"\n","\t","file_size_limit:          ",this.settings.file_size_limit,"\n","\t","file_upload_limit:        ",this.settings.file_upload_limit,"\n","\t","file_queue_limit:         ",this.settings.file_queue_limit,"\n","\t","debug:                    ",this.settings.debug.toString(),"\n","\t","prevent_swf_caching:      ",this.settings.prevent_swf_caching.toString(),"\n","\t","button_placeholder_id:    ",this.settings.button_placeholder_id.toString(),"\n","\t","button_placeholder:       ",(this.settings.button_placeholder?"Set":"Not Set"),"\n","\t","button_image_url:         ",this.settings.button_image_url.toString(),"\n","\t","button_width:             ",this.settings.button_width.toString(),"\n","\t","button_height:            ",this.settings.button_height.toString(),"\n","\t","button_text:              ",this.settings.button_text.toString(),"\n","\t","button_text_style:        ",this.settings.button_text_style.toString(),"\n","\t","button_text_top_padding:  ",this.settings.button_text_top_padding.toString(),"\n","\t","button_text_left_padding: ",this.settings.button_text_left_padding.toString(),"\n","\t","button_action:            ",this.settings.button_action.toString(),"\n","\t","button_cursor:            ",this.settings.button_cursor.toString(),"\n","\t","button_disabled:          ",this.settings.button_disabled.toString(),"\n","\t","custom_settings:          ",this.settings.custom_settings.toString(),"\n","Event Handlers:\n","\t","swfupload_preload_handler assigned:  ",(typeof this.settings.swfupload_preload_handler==="function").toString(),"\n","\t","swfupload_load_failed_handler assigned:  ",(typeof this.settings.swfupload_load_failed_handler==="function").toString(),"\n","\t","swfupload_loaded_handler assigned:  ",(typeof this.settings.swfupload_loaded_handler==="function").toString(),"\n","\t","mouse_click_handler assigned:       ",(typeof this.settings.mouse_click_handler==="function").toString(),"\n","\t","mouse_over_handler assigned:        ",(typeof this.settings.mouse_over_handler==="function").toString(),"\n","\t","mouse_out_handler assigned:         ",(typeof this.settings.mouse_out_handler==="function").toString(),"\n","\t","file_dialog_start_handler assigned: ",(typeof this.settings.file_dialog_start_handler==="function").toString(),"\n","\t","file_queued_handler assigned:       ",(typeof this.settings.file_queued_handler==="function").toString(),"\n","\t","file_queue_error_handler assigned:  ",(typeof this.settings.file_queue_error_handler==="function").toString(),"\n","\t","upload_resize_start_handler assigned:      ",(typeof this.settings.upload_resize_start_handler==="function").toString(),"\n","\t","upload_start_handler assigned:      ",(typeof this.settings.upload_start_handler==="function").toString(),"\n","\t","upload_progress_handler assigned:   ",(typeof this.settings.upload_progress_handler==="function").toString(),"\n","\t","upload_error_handler assigned:      ",(typeof this.settings.upload_error_handler==="function").toString(),"\n","\t","upload_success_handler assigned:    ",(typeof this.settings.upload_success_handler==="function").toString(),"\n","\t","upload_complete_handler assigned:   ",(typeof this.settings.upload_complete_handler==="function").toString(),"\n","\t","debug_handler assigned:             ",(typeof this.settings.debug_handler==="function").toString(),"\n","Support:\n","\t","Load:                     ",(this.support.loading?"Yes":"No"),"\n","\t","Image Resize:             ",(this.support.imageResize?"Yes":"No"),"\n"].join(""))};SWFUpload.prototype.addSetting=function(A,B,C){if(B==undefined){return(this.settings[A]=C)}else{return(this.settings[A]=B)}};SWFUpload.prototype.getSetting=function(A){if(this.settings[A]!=undefined){return this.settings[A]}return""};SWFUpload.prototype.callFlash=function(functionName,argumentArray){var movieElement,returnValue,returnString;argumentArray=argumentArray||[];movieElement=this.getMovieElement();try{if(movieElement!=undefined){returnString=movieElement.CallFunction('<invoke name="'+functionName+'" returntype="javascript">'+__flash__argumentsToXML(argumentArray,0)+"</invoke>");returnValue=eval(returnString)}else{this.debug("Can't call flash because the movie wasn't found.")}}catch(ex){this.debug("Exception calling flash function '"+functionName+"': "+ex.message)}if(returnValue!=undefined&&typeof returnValue.post==="object"){returnValue=this.unescapeFilePostParams(returnValue)}return returnValue};SWFUpload.prototype.selectFile=function(){this.callFlash("SelectFile")};SWFUpload.prototype.selectFiles=function(){this.callFlash("SelectFiles")};SWFUpload.prototype.startUpload=function(A){this.callFlash("StartUpload",[A])};SWFUpload.prototype.startResizedUpload=function(B,F,A,C,E,D){this.callFlash("StartUpload",[B,{"width":F,"height":A,"encoding":C,"quality":E,"allowEnlarging":D}])};SWFUpload.prototype.cancelUpload=function(B,A){if(A!==false){A=true}this.callFlash("CancelUpload",[B,A])};SWFUpload.prototype.stopUpload=function(){this.callFlash("StopUpload")};SWFUpload.prototype.requeueUpload=function(A){return this.callFlash("RequeueUpload",[A])};SWFUpload.prototype.getStats=function(){return this.callFlash("GetStats")};SWFUpload.prototype.setStats=function(A){this.callFlash("SetStats",[A])};SWFUpload.prototype.getFile=function(A){if(typeof(A)==="number"){return this.callFlash("GetFileByIndex",[A])}else{return this.callFlash("GetFile",[A])}};SWFUpload.prototype.getQueueFile=function(A){if(typeof(A)==="number"){return this.callFlash("GetFileByQueueIndex",[A])}else{return this.callFlash("GetFile",[A])}};SWFUpload.prototype.addFileParam=function(A,B,C){return this.callFlash("AddFileParam",[A,B,C])};SWFUpload.prototype.removeFileParam=function(A,B){this.callFlash("RemoveFileParam",[A,B])};SWFUpload.prototype.setUploadURL=function(A){this.settings.upload_url=A.toString();this.callFlash("SetUploadURL",[A])};SWFUpload.prototype.setPostParams=function(A){this.settings.post_params=A;this.callFlash("SetPostParams",[A])};SWFUpload.prototype.addPostParam=function(A,B){this.settings.post_params[A]=B;this.callFlash("SetPostParams",[this.settings.post_params])};SWFUpload.prototype.removePostParam=function(A){delete this.settings.post_params[A];this.callFlash("SetPostParams",[this.settings.post_params])};SWFUpload.prototype.setFileTypes=function(A,B){this.settings.file_types=A;this.settings.file_types_description=B;this.callFlash("SetFileTypes",[A,B])};SWFUpload.prototype.setFileSizeLimit=function(A){this.settings.file_size_limit=A;this.callFlash("SetFileSizeLimit",[A])};SWFUpload.prototype.setFileUploadLimit=function(A){this.settings.file_upload_limit=A;this.callFlash("SetFileUploadLimit",[A])};SWFUpload.prototype.setFileQueueLimit=function(A){this.settings.file_queue_limit=A;this.callFlash("SetFileQueueLimit",[A])};SWFUpload.prototype.setFilePostName=function(A){this.settings.file_post_name=A;this.callFlash("SetFilePostName",[A])};SWFUpload.prototype.setUseQueryString=function(A){this.settings.use_query_string=A;this.callFlash("SetUseQueryString",[A])};SWFUpload.prototype.setRequeueOnError=function(A){this.settings.requeue_on_error=A;this.callFlash("SetRequeueOnError",[A])};SWFUpload.prototype.setHTTPSuccess=function(A){if(typeof A==="string"){A=A.replace(" ","").split(",")}this.settings.http_success=A;this.callFlash("SetHTTPSuccess",[A])};SWFUpload.prototype.setAssumeSuccessTimeout=function(A){this.settings.assume_success_timeout=A;this.callFlash("SetAssumeSuccessTimeout",[A])};SWFUpload.prototype.setDebugEnabled=function(A){this.settings.debug_enabled=A;this.callFlash("SetDebugEnabled",[A])};SWFUpload.prototype.setButtonImageURL=function(A){if(A==undefined){A=""}this.settings.button_image_url=A;this.callFlash("SetButtonImageURL",[A])};SWFUpload.prototype.setButtonDimensions=function(C,A){this.settings.button_width=C;this.settings.button_height=A;var B=this.getMovieElement();if(B!=undefined){B.style.width=C+"px";B.style.height=A+"px"}this.callFlash("SetButtonDimensions",[C,A])};SWFUpload.prototype.setButtonText=function(A){this.settings.button_text=A;this.callFlash("SetButtonText",[A])};SWFUpload.prototype.setButtonTextPadding=function(A,B){this.settings.button_text_top_padding=B;this.settings.button_text_left_padding=A;this.callFlash("SetButtonTextPadding",[A,B])};SWFUpload.prototype.setButtonTextStyle=function(A){this.settings.button_text_style=A;this.callFlash("SetButtonTextStyle",[A])};SWFUpload.prototype.setButtonDisabled=function(A){this.settings.button_disabled=A;this.callFlash("SetButtonDisabled",[A])};SWFUpload.prototype.setButtonAction=function(A){this.settings.button_action=A;this.callFlash("SetButtonAction",[A])};SWFUpload.prototype.setButtonCursor=function(A){this.settings.button_cursor=A;this.callFlash("SetButtonCursor",[A])};SWFUpload.prototype.queueEvent=function(C,A){var B=this;if(A==undefined){A=[]}else{if(!(A instanceof Array)){A=[A]}}if(typeof this.settings[C]==="function"){this.eventQueue.push(function(){this.settings[C].apply(this,A)});setTimeout(function(){B.executeNextEvent()},0)}else{if(this.settings[C]!==null){throw"Event handler "+C+" is unknown or is not a function"}}};SWFUpload.prototype.executeNextEvent=function(){var A=this.eventQueue?this.eventQueue.shift():null;if(typeof(A)==="function"){A.apply(this)}};SWFUpload.prototype.unescapeFilePostParams=function(E){var B=/[$]([0-9a-f]{4})/i,C={},D,F,A;if(E!=undefined){for(F in E.post){if(E.post.hasOwnProperty(F)){D=F;while((A=B.exec(D))!==null){D=D.replace(A[0],String.fromCharCode(parseInt("0x"+A[1],16)))}C[D]=E.post[F]}}E.post=C}return E};SWFUpload.prototype.swfuploadPreload=function(){var A;if(typeof this.settings.swfupload_preload_handler==="function"){A=this.settings.swfupload_preload_handler.call(this)}else{if(this.settings.swfupload_preload_handler!=undefined){throw"upload_start_handler must be a function"}}if(A===undefined){A=true}return !!A};SWFUpload.prototype.flashReady=function(){var A=this.cleanUp();if(!A){this.debug("Flash called back ready but the flash movie can't be found.");return}this.queueEvent("swfupload_loaded_handler")};SWFUpload.prototype.cleanUp=function(){var A,C=this.getMovieElement();try{if(C&&typeof(C.CallFunction)==="unknown"){this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");for(A in C){try{if(typeof(C[A])==="function"){C[A]=null}}catch(D){}}}}catch(B){}window["__flash__removeCallback"]=function(E,F){try{if(E){E[F]=null}}catch(G){}};return C};SWFUpload.prototype.mouseClick=function(){this.queueEvent("mouse_click_handler")};SWFUpload.prototype.mouseOver=function(){this.queueEvent("mouse_over_handler")};SWFUpload.prototype.mouseOut=function(){this.queueEvent("mouse_out_handler")};SWFUpload.prototype.fileDialogStart=function(){this.queueEvent("file_dialog_start_handler")};SWFUpload.prototype.fileQueued=function(A){A=this.unescapeFilePostParams(A);this.queueEvent("file_queued_handler",A)};SWFUpload.prototype.fileQueueError=function(C,B,A){C=this.unescapeFilePostParams(C);this.queueEvent("file_queue_error_handler",[C,B,A])};SWFUpload.prototype.fileDialogComplete=function(C,B,A){this.queueEvent("file_dialog_complete_handler",[C,B,A])};SWFUpload.prototype.uploadResizeStart=function(B,A){B=this.unescapeFilePostParams(B);this.queueEvent("upload_resize_start_handler",[B,A.width,A.height,A.encoding,A.quality])};SWFUpload.prototype.uploadStart=function(A){A=this.unescapeFilePostParams(A);this.queueEvent("return_upload_start_handler",A)};SWFUpload.prototype.returnUploadStart=function(B){var A;if(typeof this.settings.upload_start_handler==="function"){B=this.unescapeFilePostParams(B);A=this.settings.upload_start_handler.call(this,B)}else{if(this.settings.upload_start_handler!=undefined){throw"upload_start_handler must be a function"}}if(A===undefined){A=true}A=!!A;this.callFlash("ReturnUploadStart",[A])};SWFUpload.prototype.uploadProgress=function(B,A,C){B=this.unescapeFilePostParams(B);this.queueEvent("upload_progress_handler",[B,A,C])};SWFUpload.prototype.uploadError=function(C,B,A){C=this.unescapeFilePostParams(C);this.queueEvent("upload_error_handler",[C,B,A])};SWFUpload.prototype.uploadSuccess=function(C,B,A){C=this.unescapeFilePostParams(C);this.queueEvent("upload_success_handler",[C,B,A])};SWFUpload.prototype.uploadComplete=function(A){A=this.unescapeFilePostParams(A);this.queueEvent("upload_complete_handler",A)};SWFUpload.prototype.debug=function(A){this.queueEvent("debug_handler",A)};SWFUpload.prototype.debugMessage=function(D){var B,C,A;if(this.settings.debug){C=[];if(typeof D==="object"&&typeof D.name==="string"&&typeof D.message==="string"){for(A in D){if(D.hasOwnProperty(A)){C.push(A+": "+D[A])}}B=C.join("\n")||"";C=B.split("\n");B="EXCEPTION: "+C.join("\nEXCEPTION: ");SWFUpload.Console.writeLine(B)}else{SWFUpload.Console.writeLine(D)}}};SWFUpload.Console={};SWFUpload.Console.writeLine=function(D){var A,B;try{A=document.getElementById("SWFUpload_Console");if(!A){B=document.createElement("form");document.getElementsByTagName("body")[0].appendChild(B);A=document.createElement("textarea");A.id="SWFUpload_Console";A.style.fontFamily="monospace";A.setAttribute("wrap","off");A.wrap="off";A.style.overflow="auto";A.style.width="700px";A.style.height="350px";A.style.margin="5px";B.appendChild(A)}A.value+=D+"\n";A.scrollTop=A.scrollHeight-A.clientHeight}catch(C){alert("Exception: "+C.name+" Message: "+C.message)}};swfobject=function(){var At="undefined",Ay="object",Z="Shockwave Flash",Ad="ShockwaveFlash.ShockwaveFlash",AB="application/x-shockwave-flash",Y="SWFObjectExprInst",Aw="onreadystatechange",Al=window,AG=document,AE=navigator,Ae=false,Af=[AI],AL=[],Ak=[],Aj=[],AM,Ab,Au,Ao,Ag=false,AQ=false,AK,As,AN=true,An=function(){var B=typeof AG.getElementById!=At&&typeof AG.getElementsByTagName!=At&&typeof AG.createElement!=At,I=AE.userAgent.toLowerCase(),G=AE.platform.toLowerCase(),K=G?/win/.test(G):/win/.test(I),J=G?/mac/.test(G):/mac/.test(I),A=/webkit/.test(I)?parseFloat(I.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,F=!+"\v1",E=[0,0,0],D=null;if(typeof AE.plugins!=At&&typeof AE.plugins[Z]==Ay){D=AE.plugins[Z].description;if(D&&!(typeof AE.mimeTypes!=At&&AE.mimeTypes[AB]&&!AE.mimeTypes[AB].enabledPlugin)){Ae=true;F=false;D=D.replace(/^.*\s+(\S+\s+\S+$)/,"$1");E[0]=parseInt(D.replace(/^(.*)\..*$/,"$1"),10);E[1]=parseInt(D.replace(/^.*\.(.*)\s.*$/,"$1"),10);E[2]=/[a-zA-Z]/.test(D)?parseInt(D.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof Al.ActiveXObject!=At){try{var C=new ActiveXObject(Ad);if(C){D=C.GetVariable("$version");if(D){F=true;D=D.split(" ")[1].split(",");E=[parseInt(D[0],10),parseInt(D[1],10),parseInt(D[2],10)]}}}catch(H){}}}return{w3:B,pv:E,wk:A,ie:F,win:K,mac:J}}(),AH=function(){if(!An.w3){return}if((typeof AG.readyState!=At&&AG.readyState=="complete")||(typeof AG.readyState==At&&(AG.getElementsByTagName("body")[0]||AG.body))){AR()}if(!Ag){if(typeof AG.addEventListener!=At){AG.addEventListener("DOMContentLoaded",AR,false)}if(An.ie&&An.win){AG.attachEvent(Aw,function(){if(AG.readyState=="complete"){AG.detachEvent(Aw,arguments.callee);AR()}});if(Al==top){(function(){if(Ag){return}try{AG.documentElement.doScroll("left")}catch(A){setTimeout(arguments.callee,0);return}AR()})()}}if(An.wk){(function(){if(Ag){return}if(!/loaded|complete/.test(AG.readyState)){setTimeout(arguments.callee,0);return}AR()})()}Az(AR)}}();function AR(){if(Ag){return}try{var A=AG.getElementsByTagName("body")[0].appendChild(Ap("span"));A.parentNode.removeChild(A)}catch(D){return}Ag=true;var B=Af.length;for(var C=0;C<B;C++){Af[C]()}}function Ah(A){if(Ag){A()}else{Af[Af.length]=A}}function Az(B){if(typeof Al.addEventListener!=At){Al.addEventListener("load",B,false)}else{if(typeof AG.addEventListener!=At){AG.addEventListener("load",B,false)}else{if(typeof Al.attachEvent!=At){AJ(Al,"onload",B)}else{if(typeof Al.onload=="function"){var A=Al.onload;Al.onload=function(){A();B()}}else{Al.onload=B}}}}}function AI(){if(Ae){Ac()}else{Ai()}}function Ac(){var B=AG.getElementsByTagName("body")[0];var D=Ap(Ay);D.setAttribute("type",AB);var A=B.appendChild(D);if(A){var C=0;(function(){if(typeof A.GetVariable!=At){var E=A.GetVariable("$version");if(E){E=E.split(" ")[1].split(",");An.pv=[parseInt(E[0],10),parseInt(E[1],10),parseInt(E[2],10)]}}else{if(C<10){C++;setTimeout(arguments.callee,10);return}}B.removeChild(D);A=null;Ai()})()}else{Ai()}}function Ai(){var A=AL.length;if(A>0){for(var L=0;L<A;L++){var F=AL[L].id;var D=AL[L].callbackFn;var B={success:false,id:F};if(An.pv[0]>0){var K=AP(F);if(K){if(Ar(AL[L].swfVersion)&&!(An.wk&&An.wk<312)){AD(F,true);if(D){B.success=true;B.ref=Av(F);D(B)}}else{if(AL[L].expressInstall&&Aq()){var I={};I.data=AL[L].expressInstall;I.width=K.getAttribute("width")||"0";I.height=K.getAttribute("height")||"0";if(K.getAttribute("class")){I.styleclass=K.getAttribute("class")}if(K.getAttribute("align")){I.align=K.getAttribute("align")}var H={};var E=K.getElementsByTagName("param");var J=E.length;for(var C=0;C<J;C++){if(E[C].getAttribute("name").toLowerCase()!="movie"){H[E[C].getAttribute("name")]=E[C].getAttribute("value")}}Aa(I,H,F,D)}else{AA(K);if(D){D(B)}}}}}else{AD(F,true);if(D){var G=Av(F);if(G&&typeof G.SetVariable!=At){B.success=true;B.ref=G}D(B)}}}}}function Av(D){var B=null;var C=AP(D);if(C&&C.nodeName=="OBJECT"){if(typeof C.SetVariable!=At){B=C}else{var A=C.getElementsByTagName(Ay)[0];if(A){B=A}}}return B}function Aq(){return !AQ&&Ar("6.0.65")&&(An.win||An.mac)&&!(An.wk&&An.wk<312)}function Aa(B,C,E,D){AQ=true;Au=D||null;Ao={success:false,id:E};var H=AP(E);if(H){if(H.nodeName=="OBJECT"){AM=AS(H);Ab=null}else{AM=H;Ab=E}B.id=Y;if(typeof B.width==At||(!/%$/.test(B.width)&&parseInt(B.width,10)<310)){B.width="310"}if(typeof B.height==At||(!/%$/.test(B.height)&&parseInt(B.height,10)<137)){B.height="137"}AG.title=AG.title.slice(0,47)+" - Flash Player Installation";var A=An.ie&&An.win?"ActiveX":"PlugIn",G="MMredirectURL="+Al.location.toString().replace(/&/g,"%26")+"&MMplayerType="+A+"&MMdoctitle="+AG.title;if(typeof C.flashvars!=At){C.flashvars+="&"+G}else{C.flashvars=G}if(An.ie&&An.win&&H.readyState!=4){var F=Ap("div");E+="SWFObjectNew";F.setAttribute("id",E);H.parentNode.insertBefore(F,H);H.style.display="none";(function(){if(H.readyState==4){H.parentNode.removeChild(H)}else{setTimeout(arguments.callee,10)}})()}AF(B,C,E)}}function AA(B){if(An.ie&&An.win&&B.readyState!=4){var A=Ap("div");B.parentNode.insertBefore(A,B);A.parentNode.replaceChild(AS(B),A);B.style.display="none";(function(){if(B.readyState==4){B.parentNode.removeChild(B)}else{setTimeout(arguments.callee,10)}})()}else{B.parentNode.replaceChild(AS(B),B)}}function AS(A){var F=Ap("div");if(An.win&&An.ie){F.innerHTML=A.innerHTML}else{var E=A.getElementsByTagName(Ay)[0];if(E){var D=E.childNodes;if(D){var C=D.length;for(var B=0;B<C;B++){if(!(D[B].nodeType==1&&D[B].nodeName=="PARAM")&&!(D[B].nodeType==8)){F.appendChild(D[B].cloneNode(true))}}}}}return F}function AF(I,A,G){var F,B=AP(G);if(An.wk&&An.wk<312){return F}if(B){if(typeof I.id==At){I.id=G}if(An.ie&&An.win){var H="";for(var K in I){if(I[K]!=Object.prototype[K]){if(K.toLowerCase()=="data"){A.movie=I[K]}else{if(K.toLowerCase()=="styleclass"){H+=' class="'+I[K]+'"'}else{if(K.toLowerCase()!="classid"){H+=" "+K+'="'+I[K]+'"'}}}}}var L="";for(var C in A){if(A[C]!=Object.prototype[C]){L+='<param name="'+C+'" value="'+A[C]+'" />'}}B.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+H+">"+L+"</object>";Ak[Ak.length]=I.id;F=AP(I.id)}else{var E=Ap(Ay);E.setAttribute("type",AB);for(var J in I){if(I[J]!=Object.prototype[J]){if(J.toLowerCase()=="styleclass"){E.setAttribute("class",I[J])}else{if(J.toLowerCase()!="classid"){E.setAttribute(J,I[J])}}}}for(var D in A){if(A[D]!=Object.prototype[D]&&D.toLowerCase()!="movie"){X(E,D,A[D])}}B.parentNode.replaceChild(E,B);F=E}}return F}function X(A,B,C){var D=Ap("param");D.setAttribute("name",B);D.setAttribute("value",C);A.appendChild(D)}function Ax(B){var A=AP(B);if(A&&A.nodeName=="OBJECT"){if(An.ie&&An.win){A.style.display="none";(function(){if(A.readyState==4){AO(B)}else{setTimeout(arguments.callee,10)}})()}else{A.parentNode.removeChild(A)}}}function AO(A){var C=AP(A);if(C){for(var B in C){if(typeof C[B]=="function"){C[B]=null}}C.parentNode.removeChild(C)}}function AP(A){var B=null;try{B=AG.getElementById(A)}catch(C){}return B}function Ap(A){return AG.createElement(A)}function AJ(A,B,C){A.attachEvent(B,C);Aj[Aj.length]=[A,B,C]}function Ar(A){var C=An.pv,B=A.split(".");B[0]=parseInt(B[0],10);B[1]=parseInt(B[1],10)||0;B[2]=parseInt(B[2],10)||0;return(C[0]>B[0]||(C[0]==B[0]&&C[1]>B[1])||(C[0]==B[0]&&C[1]==B[1]&&C[2]>=B[2]))?true:false}function AC(B,F,E,A){if(An.ie&&An.mac){return}var G=AG.getElementsByTagName("head")[0];if(!G){return}var D=(E&&typeof E=="string")?E:"screen";if(A){AK=null;As=null}if(!AK||As!=D){var C=Ap("style");C.setAttribute("type","text/css");C.setAttribute("media",D);AK=G.appendChild(C);if(An.ie&&An.win&&typeof AG.styleSheets!=At&&AG.styleSheets.length>0){AK=AG.styleSheets[AG.styleSheets.length-1]}As=D}if(An.ie&&An.win){if(AK&&typeof AK.addRule==Ay){AK.addRule(B,F)}}else{if(AK&&typeof AG.createTextNode!=At){AK.appendChild(AG.createTextNode(B+" {"+F+"}"))}}}function AD(A,B){if(!AN){return}var C=B?"visible":"hidden";if(Ag&&AP(A)){AP(A).style.visibility=C}else{AC("#"+A,"visibility:"+C)}}function Am(C){var A=/[\\\"<>\.;]/;var B=A.exec(C)!=null;return B&&typeof encodeURIComponent!=At?encodeURIComponent(C):C}var AT=function(){if(An.ie&&An.win){window.attachEvent("onunload",function(){var B=Aj.length;for(var A=0;A<B;A++){Aj[A][0].detachEvent(Aj[A][1],Aj[A][2])}var C=Ak.length;for(var F=0;F<C;F++){Ax(Ak[F])}for(var E in An){An[E]=null}An=null;for(var D in swfobject){swfobject[D]=null}swfobject=null})}}();return{registerObject:function(A,C,E,B){if(An.w3&&A&&C){var D={};D.id=A;D.swfVersion=C;D.expressInstall=E;D.callbackFn=B;AL[AL.length]=D;AD(A,false)}else{if(B){B({success:false,id:A})}}},getObjectById:function(A){if(An.w3){return Av(A)}},embedSWF:function(I,H,J,A,F,B,D,C,K,E){var G={success:false,id:H};if(An.w3&&!(An.wk&&An.wk<312)&&I&&H&&J&&A&&F){AD(H,false);Ah(function(){J+="";A+="";var O={};if(K&&typeof K===Ay){for(var Q in K){O[Q]=K[Q]}}O.data=I;O.width=J;O.height=A;var L={};if(C&&typeof C===Ay){for(var P in C){L[P]=C[P]}}if(D&&typeof D===Ay){for(var M in D){if(typeof L.flashvars!=At){L.flashvars+="&"+M+"="+D[M]}else{L.flashvars=M+"="+D[M]}}}if(Ar(F)){var N=AF(O,L,H);if(O.id==H){AD(H,true)}G.success=true;G.ref=N}else{if(B&&Aq()){O.data=B;Aa(O,L,H,E);return}else{AD(H,true)}}if(E){E(G)}})}else{if(E){E(G)}}},switchOffAutoHideShow:function(){AN=false},ua:An,getFlashPlayerVersion:function(){return{major:An.pv[0],minor:An.pv[1],release:An.pv[2]}},hasFlashPlayerVersion:Ar,createSWF:function(A,C,B){if(An.w3){return AF(A,C,B)}else{return undefined}},showExpressInstall:function(A,D,B,C){if(An.w3&&Aq()){Aa(A,D,B,C)}},removeSWF:function(A){if(An.w3){Ax(A)}},createCSS:function(D,A,C,B){if(An.w3){AC(D,A,C,B)}},addDomLoadEvent:Ah,addLoadEvent:Az,getQueryParamValue:function(D){var A=AG.location.search||AG.location.hash;if(A){if(/\?/.test(A)){A=A.split("?")[1]}if(D==null){return Am(A)}var C=A.split("&");for(var B=0;B<C.length;B++){if(C[B].substring(0,C[B].indexOf("="))==D){return Am(C[B].substring((C[B].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(AQ){var A=AP(Y);if(A&&AM){A.parentNode.replaceChild(AM,A);if(Ab){AD(Ab,true);if(An.ie&&An.win){AM.style.display="block"}}if(Au){Au(Ao)}}AQ=false}}}}();swfobject.addDomLoadEvent(function(){if(typeof(SWFUpload.onload)==="function"){SWFUpload.onload.call(window)}});function preLoad(){if(!this.support.loading){alert("You need the Flash Player 9.028 or above to use SWFUpload.");return false}}function loadFailed(){}function fileQueued(C){try{var B=new FileProgress(C,this.customSettings.progressTarget);B.setStatus("Pending...");B.toggleCancel(true,this)}catch(A){this.debug(A)}}function fileQueueError(E,D,A){try{if(D===SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED){alert("You have attempted to queue too many files.\n"+(A===0?"You have reached the upload limit.":"You may select "+(A>1?"up to "+A+" files.":"one file.")));return}var C=new FileProgress(E,this.customSettings.progressTarget);C.setError();C.toggleCancel(false);switch(D){case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:C.setStatus("File is too big.");this.debug("Error Code: File too big, File name: "+E.name+", File size: "+E.size+", Message: "+A);break;case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:C.setStatus("Cannot upload Zero Byte files.");this.debug("Error Code: Zero byte file, File name: "+E.name+", File size: "+E.size+", Message: "+A);break;case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:C.setStatus("Invalid File Type.");this.debug("Error Code: Invalid File Type, File name: "+E.name+", File size: "+E.size+", Message: "+A);break;default:if(E!==null){C.setStatus("Unhandled Error")}this.debug("Error Code: "+D+", File name: "+E.name+", File size: "+E.size+", Message: "+A);break}}catch(B){this.debug(B)}}function fileDialogComplete(C,A){try{if(C>0){}this.startUpload()}catch(B){this.debug(B)}}function uploadStart(C){try{var B=new FileProgress(C,this.customSettings.progressTarget);B.setStatus("Uploading...");B.toggleCancel(true,this)}catch(A){}return true}function uploadProgress(E,F,B){try{var A=Math.ceil((F/B)*100);var D=new FileProgress(E,this.customSettings.progressTarget);D.setProgress(A);D.setStatus("Uploading...")}catch(C){this.debug(C)}}function uploadSuccess(D,B){try{var C=new FileProgress(D,this.customSettings.progressTarget);C.setComplete();C.setStatus("Complete.");C.toggleCancel(false);C.setShowImage(B)}catch(A){this.debug(A)}}function uploadError(E,D,A){try{var C=new FileProgress(E,this.customSettings.progressTarget);C.setError();C.toggleCancel(false);switch(D){case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:C.setStatus("Upload Error: "+A);this.debug("Error Code: HTTP Error, File name: "+E.name+", Message: "+A);break;case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:C.setStatus("Upload Failed.");this.debug("Error Code: Upload Failed, File name: "+E.name+", File size: "+E.size+", Message: "+A);break;case SWFUpload.UPLOAD_ERROR.IO_ERROR:C.setStatus("Server (IO) Error");this.debug("Error Code: IO Error, File name: "+E.name+", Message: "+A);break;case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:C.setStatus("Security Error");this.debug("Error Code: Security Error, File name: "+E.name+", Message: "+A);break;case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:C.setStatus("Upload limit exceeded.");this.debug("Error Code: Upload Limit Exceeded, File name: "+E.name+", File size: "+E.size+", Message: "+A);break;case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:C.setStatus("Failed Validation.  Upload skipped.");this.debug("Error Code: File Validation Failed, File name: "+E.name+", File size: "+E.size+", Message: "+A);break;case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:if(this.getStats().files_queued===0){}C.setStatus("Cancelled");C.setCancelled();break;case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:C.setStatus("Stopped");break;default:C.setStatus("Unhandled Error: "+D);this.debug("Error Code: "+D+", File name: "+E.name+", File size: "+E.size+", Message: "+A);break}}catch(B){this.debug(B)}}function uploadComplete(A){if(this.getStats().files_queued===0){}}function queueComplete(A){var B=document.getElementById("divStatus")};var SWFUpload;if(typeof(SWFUpload)==="function"){SWFUpload.queue={};SWFUpload.prototype.initSettings=(function(A){return function(B){if(typeof(A)==="function"){A.call(this,B)}this.queueSettings={};this.queueSettings.queue_cancelled_flag=false;this.queueSettings.queue_upload_count=0;this.queueSettings.user_upload_complete_handler=this.settings.upload_complete_handler;this.queueSettings.user_upload_start_handler=this.settings.upload_start_handler;this.settings.upload_complete_handler=SWFUpload.queue.uploadCompleteHandler;this.settings.upload_start_handler=SWFUpload.queue.uploadStartHandler;this.settings.queue_complete_handler=B.queue_complete_handler||null}})(SWFUpload.prototype.initSettings);SWFUpload.prototype.startUpload=function(A){this.queueSettings.queue_cancelled_flag=false;this.callFlash("StartUpload",[A])};SWFUpload.prototype.cancelQueue=function(){this.queueSettings.queue_cancelled_flag=true;this.stopUpload();var A=this.getStats();while(A.files_queued>0){this.cancelUpload();A=this.getStats()}};SWFUpload.queue.uploadStartHandler=function(B){var A;if(typeof(this.queueSettings.user_upload_start_handler)==="function"){A=this.queueSettings.user_upload_start_handler.call(this,B)}A=(A===false)?false:true;this.queueSettings.queue_cancelled_flag=!A;return A};SWFUpload.queue.uploadCompleteHandler=function(D){var B=this.queueSettings.user_upload_complete_handler;var C;if(D.filestatus===SWFUpload.FILE_STATUS.COMPLETE){this.queueSettings.queue_upload_count++}if(typeof(B)==="function"){C=(B.call(this,D)===false)?false:true}else{if(D.filestatus===SWFUpload.FILE_STATUS.QUEUED){C=false}else{C=true}}if(C){var A=this.getStats();if(A.files_queued>0&&this.queueSettings.queue_cancelled_flag===false){this.startUpload()}else{if(this.queueSettings.queue_cancelled_flag===false){this.queueEvent("queue_complete_handler",[this.queueSettings.queue_upload_count]);this.queueSettings.queue_upload_count=0}else{this.queueSettings.queue_cancelled_flag=false;this.queueSettings.queue_upload_count=0}}}}};/*
	A simple class for displaying file information and progress
	Note: This is a demonstration only and not part of SWFUpload.
	Note: Some have had problems adapting this class in IE7. It may not be suitable for your application.
*/
// Constructor
// file is a SWFUpload file object
// targetID is the HTML element id attribute that the FileProgress HTML structure will be added to.
// Instantiating a new FileProgress object with an existing file will reuse/update the existing DOM elements
function FileProgress(file, targetID)
{
	this.fileProgressID = file.id;
	this.opacity = 100;
	this.height = 0;

	this.fileProgressWrapper = document.getElementById(this.fileProgressID);
	if(!this.fileProgressWrapper)
	{
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
		var tmp	= $('<div />').addClass('prtp').append('<input type="text" value="标题(不超过20个汉字)" class="crijtext mb10 r3" onfocus="if(this.value==\'标题(不超过20个汉字)\') {this.value=\'\'; $(this).addClass(\'fcbm\'); }" onblur="if(!this.value) {this.value=\'标题(不超过20个汉字)\';$(this).removeClass(\'fcbm\');}" ><input type="hidden" value="" id="coverImageUrl" class="dietimage" name="coverImageUrl">');
		tmp.append($(this.fileProgressWrapper));
		tmp.append('<div class="piic hidden"><div class="timg"><img src="" class="dietimage aa"></div><span class="btnclrj obclose" onclick="deldietimg($(this))"></span></div>');
		if($('#'+targetID).find('.prtp').size()>0)
		{
			$('#'+targetID).find('.prtp:last').after(tmp);
		}else
		{
			$('#'+targetID).prepend(tmp);
		}
	}else
	{
		this.fileProgressElement = $(this.fileProgressWrapper).find('.progressContainer:first')[0];
		this.reset();
	}
	this.height = this.fileProgressWrapper.offsetHeight;
	this.setTimer(null);
}

FileProgress.prototype.setTimer = function(timer){
	this.fileProgressElement["FP_TIMER"] = timer;
};

FileProgress.prototype.getTimer = function(timer){
	return this.fileProgressElement["FP_TIMER"] || null;
};

FileProgress.prototype.reset = function(){
	this.fileProgressElement.className = "progressContainer";
	this.fileProgressElement.childNodes[1].innerHTML = "&nbsp;";
	this.fileProgressElement.childNodes[1].className = "progressBarStatus";
	this.fileProgressElement.childNodes[2].className = "progressBarInProgress pbline";
	this.appear();	
};

FileProgress.prototype.setProgress = function(percentage){
	this.fileProgressElement.className = "progressContainer green";
	this.fileProgressElement.childNodes[2].childNodes[0].style.width = percentage + "%";
	this.appear();	
};

FileProgress.prototype.setComplete = function(){
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

FileProgress.prototype.setError = function(){
	this.fileProgressElement.className = "progressContainer red";
	this.fileProgressElement.childNodes[2].className = "progressBarError";
	this.fileProgressElement.childNodes[2].style.width = "";

	var oSelf = this;
	this.setTimer(setTimeout(function(){
		oSelf.disappear();
	}, 5000));
};

FileProgress.prototype.setCancelled = function(){
	this.fileProgressElement.className = "progressContainer";
	this.fileProgressElement.childNodes[2].className = "progressBarError";
	this.fileProgressElement.childNodes[2].style.width = "";
	var oSelf = this;
	this.setTimer(setTimeout(function () {
		oSelf.disappear();
	}, 2000));
};

FileProgress.prototype.setStatus = function(status){
	this.fileProgressElement.childNodes[1].innerHTML = status;
};

// Show/Hide the cancel button
FileProgress.prototype.toggleCancel = function(show, swfUploadInstance){
	this.fileProgressElement.childNodes[0].style.visibility = show ? "visible" : "hidden";
	if(swfUploadInstance)
	{
		var fileID = this.fileProgressID;
		this.fileProgressElement.childNodes[0].onclick = function(){
			swfUploadInstance.cancelUpload(fileID);
			return false;
		};
	}
};

FileProgress.prototype.appear = function(){
	if(this.getTimer() !== null)
	{
		clearTimeout(this.getTimer());
		this.setTimer(null);
	}
	if(this.fileProgressWrapper.filters)
	{
		try
		{
			this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity = 100;
		}catch(e)
		{
			// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
			this.fileProgressWrapper.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=100)";
		}
	}else
	{
		this.fileProgressWrapper.style.opacity = 1;
	}
	
	this.fileProgressWrapper.style.height = "";
	this.height = this.fileProgressWrapper.offsetHeight;
	this.opacity = 100;
	this.fileProgressWrapper.style.display = "";
};

// Fades out and clips away the FileProgress box.
FileProgress.prototype.disappear = function()
{
	var reduceOpacityBy = 15;
	var reduceHeightBy = 4;
	var rate = 30;	// 15 fps
	ifs(this.opacity > 0)
	{
		this.opacity -= reduceOpacityBy;
		if(this.opacity < 0)
		{
			this.opacity = 0;
		}
		if(this.fileProgressWrapper.filters)
		{
			try
			{
				this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity = this.opacity;
			}catch(e)
			{
				// If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
				this.fileProgressWrapper.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + this.opacity + ")";
			}
		}else
		{
			this.fileProgressWrapper.style.opacity = this.opacity / 100;
		}
	}
	if(this.height > 0)
	{
		this.height -= reduceHeightBy;
		if(this.height < 0)
		{
			this.height = 0;
		}
		this.fileProgressWrapper.style.height = this.height + "px";
	}
	if(this.height > 0 || this.opacity > 0)
	{
		var oSelf = this;
		this.setTimer(setTimeout(function()
		{
			oSelf.disappear();
		}, rate));
	}else
	{
		this.fileProgressWrapper.style.display = "none";
		this.setTimer(null);
	}
};

//设置返回json 并回显图片
FileProgress.prototype.setShowImage	= function(result){
	var res	= eval('('+result+')');
	if(res.status=='OK')
	{
		var tmpobj	= $(this.fileProgressElement);
		tmpobj.parents('.progressWrapper').prev('.dietimage').val(res.data.upload);
		tmpobj.parents('.progressWrapper').next('.piic').find('img').attr('src',res.data.imgUrl);
		$(".prtp:gt(0)").remove();
		tmpobj.parent().fadeOut('300',function(){
			tmpobj.parents('.prtp').find('.piic').fadeIn('300');
		})
		
	}else
	{
		if(res.data=='shibai'){
			alert('上传失败！');
			$(this.fileProgressElement).parents('.prtp').remove();
		}else{
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
$(function(){
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
	pList.each(function(n, v) {
		$(this).click(function() {
			if (n - i == 2) {
				next();
			}
			if (n - i == 0) {
				prev()
			}
			$('#slidepic ul li.cur').removeClass('cur');
			$(this).addClass('cur');
			show(n);
		}).mouseover(function() {
			$(this).addClass('hover');
		}).mouseout(function() {
			$(this).removeClass('hover');
		})
	});
	function show(i) {
		var ad = areaDailyList[i];
		$('#dailyImage').attr('src', ad.image);
	}

//-------------------------------------------------------
});
var swfu2;
$(document).ready(function()
{
    swfu2 = new SWFUpload(settings2);
});
/**
 * @desc: 初始化上传控件的各种参数
**/
var settings2 = {
	flash_url : "/static/js/swfupload.swf",
	flash9_url : "/static/js/swfupload_fp9.swf",
	upload_url: "/mall/addImg",
	hideUploadBt	: true,
	file_size_limit : "7MB",
	file_post_name	: 'dietimg',
	file_types : "*.png;*.jpg;*.gif",
	file_types_description : "png,jpg,gif",
	file_upload_limit :4,
	file_queue_limit : 0,
	debug: false,
	button_width: "85",
	button_height: "39",
	button_placeholder_id: "swfbtn2",
	button_text: '<span class="theFont"></span>',
	button_text_style: ".theFont { font-size: 16px;}",
	button_text_left_padding: 12,
	button_text_top_padding: 3,
	button_cursor:SWFUpload.CURSOR.HAND,

	swfupload_preload_handler : preLoad,
	swfupload_load_failed_handler : loadFailed,
	file_queued_handler : fileQueued,
	file_queue_error_handler : fileQueueErrorNew,
	file_dialog_complete_handler : fileDialogComplete,
	upload_start_handler : uploadStart,
	upload_progress_handler : uploadProgress,
	upload_error_handler : uploadError,
	upload_success_handler : uploadSuccess2,
	upload_complete_handler : uploadCompleteNew,
	queue_complete_handler : queueComplete,
};

/**
 * @desc: 删除某一个美食日记图片
**/
function deldietimg(obj)
{
	$(obj).parents('.prtp').remove();
}

/**
 * @desc:判断图片是否上传完成
**/
function isuploading()
{
	return $('.picgrem:visible').size() > 0 ? true:false;
}

/**
 * @desc: 错误提示信息
 * @param tips
**/
function showerrorinfos(tips)
{
	$("#dieterrorinfo").html(tips).show();
}
function backToTop(num)
{
    var num = typeof num == 'undefined' ? 0 : num;
    if(num == 0)
    {
        t = $(document).scrollTop();
        num = t;
    }
    var t = $(document).scrollTop();
    $(document).scrollTop(t - num);
}

/**
 *	@DESC swfupload 上传队列自定义处理方法。主要自定出错信息
 *	@author cntnn11
 *	@date 2013-10-08
*/
function fileQueueErrorNew(file, errorCode, message) {
	try {
		switch (errorCode)
		{
			case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
				alert("为保证您的使用体验，单次上传请不要超过4张");
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
	catch (ex)
	{
		this.debug(ex);
    }
}
/**
 *	@DESC 图片上传成功后的处理。只是把错误提示内容给清空了
 *	@author cntnn11
 *	@date 2013-10-08
*/
function uploadCompleteNew(file) {
	showerrorinfos('');
	/*if (this.getStats().files_queued === 0) {
	//	document.getElementById(this.customSettings.cancelButtonId).disabled = true;
	}*/
}
var j=0;
function uploadSuccess2(D,B)
{
	var res=eval("("+B+")");
	if(res.status=='OK')
	{
        var html    = ' <div class="xtp"><div class="xde"><img src="'+res.data.imgurl+'"></div>';
            html    +='<a href="javascript:void(0)" class="gb"><i class="xx xx4" onclick="tclose(this)"></i></a><input type="hidden" name="setpImages[]" value="'+res.data.imgurl+'" /></div>';
        $('#xtp').append(html);

		j++;
	}else{
		if(res.data=='shibai'){
			alert('上传失败！');
		}else{
		//showError('上传失败');
			alert('图片大小不能超过8M!');
		}
	}
}
function tclose(obj)
{
    $(obj).parent().parent().remove();
    var stats = swfu2.getStats();
    stats.successful_uploads--;
    swfu2.setStats(stats);
}
