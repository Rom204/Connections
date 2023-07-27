import { AccountCircle } from "@mui/icons-material";
import { TextField, Box } from "@mui/material";
import { useForm } from "react-hook-form";

interface TextFieldProps {
	id: string;
	type: string;
	placeholder: string;
	label: string;
	variant: "standard" | "outlined" | "filled";
}

const Text_field = (props: TextFieldProps): JSX.Element => {
	console.log(props)
	const { register } = useForm({});

	return (
		<TextField
			id={props.id}
			sx={{ width: "8rem", margin: "2rem" }}
			type={props.type}
			placeholder={props.placeholder}
			label={props.label}
			variant={props.variant}
			// {...register(`${props.register}`)}
		/>
	);
};

export default Text_field;
