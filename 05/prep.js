$(document).ready(function() {
  $('a').each(function(i, item) {
    if (this.hostname == location.hostname && this.hash) {
      this.href = location.href + this.hash;
    }
  });
});