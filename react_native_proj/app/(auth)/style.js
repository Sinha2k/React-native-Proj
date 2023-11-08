import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        width: '90%',
        marginLeft: '5%',
        height: '100%'
    },
    headerText: {
        fontFamily: FONT.bold,
        fontSize: 30,
        marginBottom: 10
    },
    textInputContainer: {
        width: '100%',
        position: 'relative',
        height: 70,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    textInput: {
        borderRadius: 20,
        width: '100%',
        backgroundColor: '#ECECEC',
        paddingLeft: 50,
        paddingVertical: 15,
        paddingRight: 20
    },
    textInputIcon: {
        position: 'absolute',
        left: 15,
        opacity: 0.2,
        top: 20,
        zIndex: 100
    },
    fotgetContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 5
    },
    forgetText: {
        fontFamily: FONT.medium,
        fontSize: SIZES.small,
        color: COLORS.tertiary,
    },
    buttonContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        flexDirection: 'row',
        backgroundColor: COLORS.tertiary,
        borderRadius: 30,
        marginTop: 15,
    },
    buttonText: {
        color: '#fff',
        fontFamily: FONT.medium,
    },
    orLoginContainer: {
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        marginTop: 30
    },
    orLoginText: {
        fontFamily: FONT.medium,
        backgroundColor: COLORS.white,
        width: '40%',
        textAlign: 'center'
    },
    line: {
        height: 1,
        backgroundColor: COLORS.gray2,
        width: '100%',
        position: 'absolute',
        left: 0
    },
    logoContainer: {
        width: '60%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    logoItem: {
        padding: 5,
        borderRadius: 100,
        borderColor: '#ECECEC',
        borderWidth: 1
    },
})

export default styles;