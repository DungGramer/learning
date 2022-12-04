import { Button } from 'shared-ui';

export default function Index() {
  return (
    <div>
      <Button onclick={() => console.log('Hello World!')}>Click Me</Button>
    </div>
  );
}
