import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

interface DialogBoxProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	deleteUser: () => void;
}

const DialogBox = ({ open, setOpen, deleteUser }: DialogBoxProps) => {
	const handleClose = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		// if event is happening on an element
		if (!(e.target instanceof Element)) {
			return;
		}
		if (e.target.id === "confirm") {
			deleteUser();
		}

		setOpen(false);
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Are you sure you want to delete this student?"}
				</DialogTitle>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button
						id="confirm"
						onClick={(e) => handleClose(e)}
						autoFocus
					>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default DialogBox;
