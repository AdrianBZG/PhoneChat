function loadSpeechRecognitionActions() {
  if (annyang) {
		// Let's define our first command. First the text we expect, and then the function it should call
		var commands = {
			'show test': function() {
				alert('test');
			},

			'show teacher': function() {
				alert('hello teacher');
			},

			'show superman': function() {
				alert('my name is superman');
			},

			'move developers': function() {
				$.mobile.navigate("#developers");
			},

			'move login': function() {
				showLoginModal();
			},

			'move chat': function() {
				$.mobile.navigate("#chat");
			},

			'show menu': function() {
				$('#showMenuBtn').click();
			}

		};

		// Add our commands to annyang
		annyang.addCommands(commands);

		// Start listening. You can call this here, or attach this call to an event, button, etc.
		annyang.start();
	}
}
