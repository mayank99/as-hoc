import * as React from 'react';
import styles from './styles.module.css';

/**
 * Returns a polymorphic component with simple attribute support.
 * Supports all built-in html elements, accessible as keys.
 * 
 * @example
 * const MyThing = polymorphic.div('my-thing');
 * <MyThing>...</MyThing>
 *
 * @example
 * const MyButton = polymorphic.button('my-button', { type: 'button' });
 * 
 * // renders <button type='button' class='__my-button-123abc'>
 * <MyButton>...</MyButton>
 * 
 * // renders <a> and supports intellisense for href, etc
 * <MyButton as='a' href='#'>...</MyButton>
 */
export const polymorphic = new Proxy({}, {
	get: (target, prop) => {
		if (typeof prop === 'string') {
			return (<As extends keyof JSX.IntrinsicElements = 'div'>(element: As) => {
				return (className: string, attributes?: JSX.IntrinsicElements[As]) => {
					return React.forwardRef(({ as = element, ...props }, forwardedRef) => {
						const Element = (as as any); // assertion is ok here, it's internal
						return (
							<Element
								ref={forwardedRef}
								{...attributes} // from the "outer" object (where instantiated)
								{...props} // from the "inner" props (where used)
								className={[styles[className], props.className, attributes?.className]
									.filter(Boolean)
									.join(' ')
								}
							/>
						);
					}) as PolymorphicForwardRefComponent<NonNullable<typeof element>>;
				}
			})(prop as keyof JSX.IntrinsicElements);
		}
		return Reflect.get(target, prop);
	},
}) as { [key in keyof JSX.IntrinsicElements]: (className: string, attributes?: JSX.IntrinsicElements[key]) => PolymorphicForwardRefComponent<key> };

/** Renders a simple `<div>` that supports the `as` prop. */
export const Box = polymorphic.div('');

// dont even ask
interface PolymorphicForwardRefComponent<
	DefaultAs,
	OwnProps = {}
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
