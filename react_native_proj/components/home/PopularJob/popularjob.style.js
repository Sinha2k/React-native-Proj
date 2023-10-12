import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: '1',
        paddingLeft: SIZES.medium,
        paddingRight: SIZES.medium,
    },
    textwrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    title: {
        fontFamily: FONT.medium,
        fontSize: SIZES.medium
    },
    show: {
        fontSize: SIZES.small,
        color: COLORS.gray,
        textDecorationLine: "underline"
    },
    flatlist: {
        marginTop: SIZES.xSmall,
        marginBottom: 15
    }
})

export default styles;