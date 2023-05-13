import * as React from 'react';
import styles from './styles.module.css';

export const ScopedBox = <T extends keyof JSX.IntrinsicElements = 'div'>(
	className: string,
	defaultAs?: T,
	attrs?: JSX.IntrinsicElements[T]
) => {
	return React.forwardRef(({ as = defaultAs, ...props }, ref) => {
		const Element = (as as any) || 'div';
		return (
			<Element
				ref={ref}
				{...attrs}
				{...props}
				className={[styles[className], props.className]
					.filter(Boolean)
					.join(' ')}
			/>
		);
	}) as PolymorphicForwardRefComponent<NonNullable<typeof defaultAs>, {}>;
};

interface PolymorphicForwardRefComponent<
	DefaultAs,
	OwnProps = Record<string, unknown>
> extends React.ForwardRefExoticComponent<
		Merge<
			DefaultAs extends React.ElementType
				? React.ComponentPropsWithRef<DefaultAs>
				: never,
			OwnProps & { as?: DefaultAs }
		>
	> {
	<As = DefaultAs>(
		props: As extends keyof JSX.IntrinsicElements
			? Merge<JSX.IntrinsicElements[As], OwnProps & { as: As }>
			: As extends React.ComponentType<infer P>
			? Merge<P, OwnProps & { as: As }>
			: never
	): React.ReactElement | null;
}

type Merge<Record1, Record2> = Omit<Record1, keyof Record2> & Record2;
