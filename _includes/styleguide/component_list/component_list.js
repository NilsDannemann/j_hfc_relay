<script>
	(function (document, undefined) {
		document.getElementById('component_list').onchange = function() {
			var val = this.value;
			if (val !== "") {
				window.location = val;
			}
		}
	})(document);
</script>