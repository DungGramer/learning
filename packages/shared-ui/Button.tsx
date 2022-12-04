export const Button = (props: any) => {
  return <button onClick={() => props.onClick()}>{props.children}</button>;
};
