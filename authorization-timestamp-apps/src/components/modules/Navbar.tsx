import Box from "../base/Box";

export default function Navbar() {
	return (
		<Box className="flex justify-between items-center">
			<div className="grid grid-rows-2 gap-y-2">
				<h3 className="text-2xl">Rifqi Taufiqul Hakim</h3>
				<h4 className="text-lg">hakim@mail.com</h4>
			</div>
			<div className="grid grid-cols-2 gap-5">
				<button>Edit Profile</button>
				<button>Logout</button>
			</div>
		</Box>
	)
}
