class VRButton {

  static createButton( renderer ) {

    const button = document.createElement( 'button' )

    function showEnterVR( /*device*/ ) {

      let currentSession = null

      async function onSessionStarted( session ) {

        session.addEventListener( 'end', onSessionEnded )

        await renderer.xr.setSession( session )
        button.textContent = 'EXIT VR'

        currentSession = session

      }

      function onSessionEnded( /*event*/ ) {

        currentSession.removeEventListener( 'end', onSessionEnded )

        button.textContent = 'ENTER VR'

        currentSession = null

      }

      //

      button.style.display = ''
      button.textContent = 'ENTER VR'

      button.onmouseenter = function () {

        button.style.opacity = '1.0'

      }

      button.onmouseleave = function () {

        button.style.opacity = '0.5'

      }

      button.onclick = function () {

        if ( currentSession === null ) {

          // WebXR's requestReferenceSpace only works if the corresponding feature
          // was requested at session creation time. For simplicity, just ask for
          // the interesting ones as optional features, but be aware that the
          // requestReferenceSpace call will fail if it turns out to be unavailable.
          // ('local' is always available for immersive sessions and doesn't need to
          // be requested separately.)

          const sessionInit = { optionalFeatures: [ 'local-floor', 'bounded-floor', 'hand-tracking' ] }
          navigator.xr.requestSession( 'immersive-vr', sessionInit ).then( onSessionStarted )

        } else {

          currentSession.end()

        }

      }

    }

    function disableButton() {

      button.style.display = ''
      button.classList.add('disabled')

      button.onmouseenter = null
      button.onmouseleave = null

      button.onclick = null

    }

    function showWebXRNotFound() {

      disableButton()

      button.textContent = 'VR NOT SUPPORTED'

    }

    if ( 'xr' in navigator ) {

      button.id = 'VRButton'
      button.style.display = 'none'

      navigator.xr.isSessionSupported( 'immersive-vr' ).then( function ( supported ) {

        supported ? showEnterVR() : showWebXRNotFound()

      } )

      return button

    } else {

      const message = document.createElement( 'a' )

      if ( window.isSecureContext === false ) {

        message.href = document.location.href.replace( /^http:/, 'https:' )
        message.innerHTML = 'WEBXR NEEDS HTTPS' // TODO Improve message

      } else {

        message.href = 'https://ctrlalt.dev/'
        message.innerHTML = 'WEBXR NOT AVAILABLE'

      }

      message.id = 'VRButton'
      message.classList.add('unsupported')

      return message

    }

  }

}

export { VRButton }
