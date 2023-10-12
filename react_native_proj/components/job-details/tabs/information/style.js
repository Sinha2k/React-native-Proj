import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    title: {
        fontFamily: FONT.bold,
        fontSize: SIZES.medium
    },
    info_item: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        marginTop: 13
    },
    item_icon: {
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#F8F7F7'
    },
    item_content: {
        marginLeft: 15,
        width: '85%'
    }
})

export default styles