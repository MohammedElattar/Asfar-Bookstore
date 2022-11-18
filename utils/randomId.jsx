export default function randomId(length = 8) {
  const nums = "1234567890";
  const upper = "ZXCVBNMLPOKIJUHYGTFRDESWAQ";
  const lower = upper.toLowerCase();
  const symbols = "/*-.|}]{{?/>.<,)(_=+";
  const mix = [...nums, ...upper, ...lower, ...symbols];
  const shuffled = mix.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, length).join('');
}
