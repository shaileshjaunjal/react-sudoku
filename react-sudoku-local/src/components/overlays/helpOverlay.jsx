import { Button } from "@mui/material";
import { OverlayContainer, OverlayContent } from "./overlay";


const HelpOverlay = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <OverlayContainer>
      <OverlayContent>
        <Button onClick={onClose} variant="contained" color="primary">
          Close help
        </Button>
      </OverlayContent>
    </OverlayContainer>
  );

}

export default HelpOverlay



