import { StyleSheet, Dimensions} from 'react-native'

const {width: screenWidth, height: screenHeight} = Dimensions.get("window")
const extHeight = (screenHeight-650)/15


const styles = StyleSheet.create({
container: {
        flex: 1,
        backgroundColor: '#62A6DB',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    title1: {
        fontSize: 36 + extHeight /3,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20 + 3 * extHeight,
    },
    title2: {
        fontSize: 32 + extHeight /3,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10 + extHeight
    },
    normalText: {
        width:'80%',
        fontSize: 16 + extHeight /3,
        color: "white",
        textAlign: 'center',
        marginTop: 0 + extHeight
    },
//     normalText1: {
//         width:'75%',
//         fontSize: 16 + extHeight /3,
//         color: "white",
//         textAlign: 'center',
//         marginTop: 20 + extHeight*2
//     },
//     normalText2: {
//         width:'75%',
//         fontSize: 16 + extHeight /3,
//         color: "white",
//         textAlign: 'center',
//         marginTop: 20
//     },
    image: {
        width: '100%',
        height: 90 + extHeight,
        resizeMode: 'contain',
        marginTop: 30 + extHeight*2,
        marginBottom: extHeight*2,
    },
    imageCircle: {
        width: '100%',
        height: 200 + 5*extHeight,
        resizeMode: 'contain',
        marginTop: 0,
        marginBottom: 0
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 45 + extHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:10,
        marginBottom: 15
    },
    bottom2: {
        width: '100%',
        height: 45 + extHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    },
    icon: {
        width: 45 + extHeight,
        height:45 + extHeight,
        alignItems:'center',
        justifyContent:'center',
    },
    content:{
        flex:1,
        backgroundColor:'white',
        width: '100%',
        marginVertical: 20
    },
    checkText:{
        fontSize: 24 + extHeight / 3,
        color: "#505050",
        textAlign: 'center',
    },
    checkboxContent:{
        paddingHorizontal: 20,
        backgroundColor:'#E5E5E5',
        height: 65 + extHeight,
        marginVertical: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    outerButton: {
        width: 200 + 2 * extHeight,
        height: 200 + 2 * extHeight,
        borderRadius: 100 + extHeight,
        borderWidth: 5,
        borderColor:  '#F24663',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        marginTop: 25 + 2 * extHeight,
    },
    innerButton: {
        width: 172 + 2 * extHeight,
        height: 172 + 2 * extHeight,
        borderColor: '#F24663',
        borderRadius: 86 + extHeight,
        borderWidth: 5,
        backgroundColor: 'rgba(244,89,115,0.68)',
    },
    icon: {
        width: 45 + extHeight,
        height:45 + extHeight,
        alignItems:'center',
        justifyContent:'center',
    },
    alertText: {
        width:'90%',
        fontSize: 20 + extHeight /3,
        color: "red",
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 150+9*extHeight
    },
})

export { styles, extHeight };