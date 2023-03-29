import React, { useState, useEffect } from 'react';

type DraggableProps = {
	onDragStart?: () => void;
	onDragEnd?: () => void;
	onDrag?: (left: number, top: number) => void;
};

const withDraggable = <P extends object>(Component: React.ComponentType<P>) => {
	const WrappedComponent = (props: P & DraggableProps) => {
		const [isDragging, setIsDragging] = useState(false);
		const [initialPosition, setInitialPosition] = useState({ left: 0, top: 0 });
		const [position, setPosition] = useState({ left: 0, top: 0 });

		const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
			const target = event.target as HTMLElement;
			if (target.classList.contains('draggable')) {
				event.preventDefault();
				setIsDragging(true);
				setInitialPosition({
					left: event.clientX - position.left,
					top: event.clientY - position.top,
				});
				props.onDragStart && props.onDragStart();
			}
		};

		const handleMouseUp = () => {
			setIsDragging(false);
			props.onDragEnd && props.onDragEnd();
		};

		const handleMouseMove = (event: MouseEvent) => {
			if (isDragging) {
				const left = event.clientX - initialPosition.left;
				const top = event.clientY - initialPosition.top;
				setPosition({ left, top });
				props.onDrag && props.onDrag(left, top);
			}
		};

		useEffect(() => {
			document.addEventListener('mousemove', handleMouseMove);
			document.addEventListener('mouseup', handleMouseUp);
			return () => {
				document.removeEventListener('mousemove', handleMouseMove);
				document.removeEventListener('mouseup', handleMouseUp);
			};
		}, [isDragging]);

		return (
			<div
				style={{
					position: 'absolute',
					left: position.left,
					top: position.top,
				}}
				onMouseDown={handleMouseDown}>
				<Component {...(props as P)} />
			</div>
		);
	};

	return WrappedComponent;
};

export default withDraggable;
