import { Paper, Button, Box } from '@mui/material';
import { styled } from '@mui/system';

export const OverlayContainer = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background
    zIndex: 100, // Ensures it's above other content
}));

export const OverlayContent = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    width: '50vw',
    height: '40vh',
    maxWidth: 400,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF1FF'
}));

// color pallet 1 #A1D6B2 #CEDF9F #F1F3C2 #E8B86D

// color pallet 2 #B6FFFA #98E4FF #80B3FF #687EFF

// color pallet 3 #B1B2FF #AAC4FF #D2DAFF #EEF1FF **

// color pallet 4 #F9F7F7 #DBE2EF #3F72AF #112D4E

const Overlay = ({ open, onClose, children }) => {
    if (!open) return null;

    return (
        <OverlayContainer>
            <OverlayContent>
                {children}
                <Button onClick={onClose} variant="contained" color="primary">
                    Close
                </Button>
            </OverlayContent>
        </OverlayContainer>
    );
};

export default Overlay;