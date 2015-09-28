<!-- COMPONENT_NAV JS -->
<script>    
	(function (document, undefined) {
		document.getElementById('component_nav').onchange = function() {
			var val = this.value;
			if (val !== "") {
				window.location = val;
			}
		}
	})(document);
</script>