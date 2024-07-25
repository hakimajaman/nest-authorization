import {BgColors} from "@/utils/types";
import Box from "../base/Box";

type Props = {
	name?: string;
	total?: number;
	bgColor?: BgColors
}

export default function Statistic({ name, total, bgColor }: Props) {
	return (
		<Box className="flex justify-center items-center" bgColor={bgColor}>
			<p className="text-4xl mr-3">{total}</p>
			<p className="text-lg">{name}</p>
		</Box>
	)
}
