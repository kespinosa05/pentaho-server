





<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" class="bootstrap">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Pentaho User Console - Login</title>

  

<meta name="gwt:property" content="locale=en_US">
<link rel="icon" href="/pentaho-style/favicon.ico"/>
<link rel="apple-touch-icon" sizes="180x180" href="/pentaho-style/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/pentaho-style/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/pentaho-style/favicon-16x16.png">
<link rel="mask-icon" href="/pentaho-style/safari-pinned-tab.svg" color="#cc0000">

<script language="javascript" type="text/javascript" src="webcontext.js"></script>
<script type="text/javascript">
  var targetUrl = window.location.pathname.replace(new RegExp("(/){2,}"), "/");
  if (history && history.pushState){
    history.pushState(null, null, targetUrl);
  }
</script>

</head>

<body class="pentaho-page-background">
<div id="login-wrapper">
  <div id="login-header-wrapper">
    <div id="login-header-logo"></div>
    <div id="login-header-separator-box">
      <div id="login-header-separator"></div>
      <div id="login-header-separator-padding"></div>
    </div>
    <div id="login-header-app-name">Pentaho User Console</div>
  </div>
  <div id="login-background-main">
    <div id="login-background-opacity">
      <div id="login-background">

        <div id="login-title">Welcome</div>
        <div id="login-messages" class="none-login-message-visible">
          <div id="loginError" class="login-error-message">
            <div class="login-error-icon"></div>
            <div class="login-error-text">A login error occurred.<br />Please try again.</div>
          </div>
        </div>

        
        <div id="login-form-container" class="lang_en">
          <div id="animate-wrapper">
            <h1>User Console</h1>
            <form name="login" id="login" action="j_spring_security_check" method="POST"
                  onkeyup="if(window.event && window.event.keyCode && window.event.keyCode==13){var buttonToClick = document.getElementById('loginbtn'); if(buttonToClick){ buttonToClick.click();}}">
              <div class="row-fluid nowrap">
                <div class="space-10"></div>
                <div class="input-container">
                  <label>Username</label>
                  <input id="j_username" name="j_username" type="text" placeholder="" autocomplete="off">
                </div>
                <div class="space-30"></div>
                <div class="input-container">
                  <label>Password</label>
                  <input id="j_password" name="j_password" type="password"
                         placeholder=""
                         autocomplete="off">
                </div>
                <div class="space-60"></div>
                <div class="input-container">
                  <button type="submit" id="loginbtn" class="btn">Log in</button>
                </div>
                <div class="space-60"></div>
              </div>
              <div class="space-60"></div>
              <div id="eval-users-toggle-container">
                
                <div id="eval-users-toggle" onClick="toggleEvalPanel()">
                  <div>Log in as an evaluator</div>
                  <div id="eval-arrow" class="closed"></div>
                </div>

                
              </div>
            </form>
          </div>

          <div class="row-fluid">
            <div id="evaluationPanel" class="span10 row-fluid">
              <div id="role-admin-panel" class="span6 well">
                <div class="login-role">Administrator</div>
                <div class="row-fluid">
                  <div class="span6 login-label">Username</div>
                  <div class="span6 login-value">Admin</div>
                </div>
                <div class="row-fluid">
                  <div class="span6 login-label">Password</div>
                  <div class="span6 login-value">password</div>
                </div>
                <button class="btn" onClick="loginAs('Admin', 'password');">Log in</button>
              </div>
              <div id="role-business-user-panel" class="span6 well">
                <div class="login-role">Business User</div>
                <div class="row-fluid">
                  <div class="span6 login-label">Username</div>
                  <div class="span6 login-value">Suzy</div>
                </div>
                <div class="row-fluid">
                  <div class="span6 login-label">Password</div>
                  <div class="span6 login-value">password</div>
                </div>
                <button class="btn" onClick="loginAs('Suzy', 'password');">Log in</button>
              </div>
            </div>
          </div>

          <div class="space-30"></div>

        </div>
      </div>
    </div>
  </div>
  <div id="login-footer-wrapper">
    <div id="login-footer-company">Hitachi Vantara</div>
    <div id="login-footer-copyright">&copy; 2005-2020 Hitachi Vantara. All Rights Reserved.</div>
  </div>
</div>

<script type="text/javascript">

  

  function toggleEvalPanel() {
    var evaluationPanel = $("#evaluationPanel");
    evaluationPanel.toggleClass("afterSlide");
    $("#eval-arrow").toggleClass("closed");
  }
  

  function bounceToReturnLocation() {
    var returnLocation = 'http:\/\/pentaho.krugernetes.com\/pentaho\/js\/marketplace.js';

    if (returnLocation != '' && returnLocation != null) {
      window.location.href = returnLocation;
    } else {
      window.location.href = window.location.href.replace("Login", "Home");
    }

  }

  function doLogin() {

    // if we have a valid session and we attempt to login on top of it, the server
    // will actually log us out and will not log in with the supplied credentials, you must
    // login again. So instead, if they're already logged in, we bounce out of here to
    // prevent confusion.
    if (false) {
      bounceToReturnLocation();
      return false;
    }

    jQuery.ajax({
      type: "POST",
      url: "j_spring_security_check",
      dataType: "text",
      data: $("#login").serialize(),

      error:function (xhr, ajaxOptions, thrownError){
        if (xhr.status == 404) {
          // if we get a 404 it means login was successful but intended resource does not exist
          // just let it go - let the user get the 404
          bounceToReturnLocation();
          return;
        }
        //Fix for BISERVER-7525
        //parsereerror caused by attempting to serve a complex document like a prd report in any presentation format like a .ppt
        //does not necesarly mean that there was a failure in the login process, status is 200 so just let it serve the archive to the web browser.
        if (xhr.status == 200 && thrownError == 'parsererror') {
          document.getElementById("j_password").value = "";
          bounceToReturnLocation();
          return;
        }
        // fail
        showOneErrorMessage('loginError');
      },

      success:function(data, textStatus, jqXHR){
        if (data.indexOf("j_spring_security_check") != -1) {
          // fail
          showOneErrorMessage('loginError');
          return false;
        } else {
          document.getElementById("j_password").value = "";
          bounceToReturnLocation();
        }
      }
    });
    return false;
  }

  function showOneErrorMessage(divId) {
    var msgs = document.getElementsByClassName('login-error-message');
    var isSomeMessageVisible = false;
    if(msgs && msgs.length > 0) {
      for (var i = 0; i < msgs.length; i++) {
        if(msgs[i].id === divId) {
          msgs[i].style.display='inline-flex';
          isSomeMessageVisible = true;
        } else {
          msgs[i].style.display='none';
        }
      }
    }

    if(isSomeMessageVisible){
      document.getElementById('login-messages').className='some-login-message-visible';
    } else {
      document.getElementById('login-messages').className='none-login-message-visible';
    }
  }

  function loginAs (username, password) {
    $("#j_username").prop("value", username);
    $("#j_password").prop("value", password);
    doLogin();
  }

  $(document).ready(function(){
    $("#login").submit(doLogin);

    if (false) {
      bounceToReturnLocation();
    }


    $("#login-background").fadeIn(1000, function() {
      $("#animate-wrapper").addClass("afterSlide");
      $("#j_username").focus();
    });


  });
</script>
</body>
