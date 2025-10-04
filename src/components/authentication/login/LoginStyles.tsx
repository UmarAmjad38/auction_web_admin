import { makeStyles } from '@mui/styles';

export const useCarousalStyles = makeStyles({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
    },
    text: {
        marginBottom: 16,
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        padding: "20px 0",
    },
    imageWrapper: {
        textAlign: 'center',
        width: '100%',
    },
    image: {
        width: '80%',
        height: 'auto',
        transition: 'width 0.2s ease-in-out',
    },
    dotsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    dotButton: {
        size: 'small',
        width: 18,
        height: 18,
        margin: '0 4px !important',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-color 0.5s ease-in-out',
    },
});

export const useLoginStyles = makeStyles({
    root: {
        display: 'flex',
        minHeight: '92vh',
        overflow: 'hidden',
        flexDirection: 'column',
        '@media (min-width:600px)': {
            flexDirection: 'row',
        },
    },
    carouselContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    componentContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    fadeWrapper: {
        width: '100%',
    },
});

export const useForgotPasswordStyles = makeStyles({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px',
    },
    formWrapper: {
        width: '100%',
        maxWidth: 400,
    },
    title: {
        marginBottom: '16px',
    },
    description: {
        marginBottom: '16px',
        fontSize: '15px',
    },
    label: {
        paddingTop: '16px',
        fontWeight: 600,
        fontSize: '15px',
    },
});

export const useResetPasswordStyles = makeStyles({
    codeInputContainer: {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        gap: 8,
    },
});

// New styles for SetNewPassword
export const useSetNewPasswordStyles = makeStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    paper: {
        padding: 4,
        maxWidth: 400,
        width: '100%',
    },
    title: {
        padding: '8px 0',
    },
    description: {
        fontSize: 16,
        marginBottom: '16px',
    },
    label: {
        fontWeight: 600,
        fontSize: 15,
        paddingTop: '16px',
    },
    textFieldWrapper: {
        width: '100%',
        padding: '8px 0',
    },
    buttonWrapper: {
        marginTop: '16px',
        fontSize: 16,
    },
});