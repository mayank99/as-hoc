import { useState } from 'react';
import { polymorphic, Box } from './polymorphic.tsx';

const Main = polymorphic.main('my-main');
const H1 = polymorphic.h1('my-h1');
const Button = polymorphic.button('my-button', { type: 'button' });

function App() {
	const [count, setCount] = useState(0);

	return (
		<Main>
			<H1>Hello world!</H1>
			<Button onClick={() => setCount((count) => count + 1)}>
				count is {count}
			</Button>
			<Box as='p'>Check out polymorphic.tsx for the magic.</Box>
		</Main>
	);
}

export default App;
