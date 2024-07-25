import {BgColors} from "@/utils/types";
import {ReactNode} from "react";

type Props = {
	children: ReactNode
	bgColor?: BgColors
	className?: string
}

export default function Box({ children, bgColor = BgColors.Slate, className }: Props) {
	return (
		<div className={`${bgColor} px-5 py-3 rounded drop-shadow-md ${className}`}>
			{children}
		</div>
	)
}
