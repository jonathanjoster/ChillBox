// post with a tag
function sendPost(event, attribute) {
  event.preventDefault();
  const form = document.createElement('form');
  form.action = event.target.href;
  form.method = 'post';

  const input = document.createElement('input');
  input.name = 'word';
  input.value = attribute;

  form.appendChild(input);
  document.body.appendChild(form);
  form.submit();
}