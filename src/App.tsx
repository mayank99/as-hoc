import { useState } from 'react';
import { ScopedBox } from './ScopedBox.tsx';

const Main = ScopedBox('my-main', 'main');
const H1 = ScopedBox('my-h1', 'h1');
const Button = ScopedBox('my-button', 'button', { type: 'button' });

function App() {
	const [count, setCount] = useState(0);

	return (
		<Main>
			<H1>Hello world!</H1>
			<Button onClick={() => setCount((count) => count + 1)}>
				count is {count}
			</Button>
		</Main>
	);
}

export default App;
