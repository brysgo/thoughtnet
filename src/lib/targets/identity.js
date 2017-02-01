export default function*({inputs}) {
  yield inputs.map((i) => i.next().value);
}