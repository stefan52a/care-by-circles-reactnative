import {colors}  from "./colors";
import { p } from "./normalize";

export default{
    container : {    
        flex: 1,
        // paddingTop: 24
    },
    mainHeader: {
        width: '100%',
        paddingHorizontal: p(12),
        backgroundColor: '#fff',
        elevation: 3,
        paddingVertical:p(4)
    },
    textinput:{
        height: 36,
        borderColor: colors.GREY2,
        borderRadius: 5,
        borderWidth: 1,
        padding: 0,
        paddingLeft: 10,
        fontSize:15,
        marginTop: 1,
        // fontFamily:'Montserrat-Medium',
    },
    indicatorContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0,0.5)",
        alignItems: "center",
        justifyContent: "center"
    },
    indicator: {
        width: p(80),
        height: p(80),
        borderRadius: p(5),
        shadowColor: "black",
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        // backgroundColor: "white"
    },
    smallText:{
        // fontFamily:'Montserrat-Medium',
        fontSize:11,
        color:colors.DARK2
    },
    labelText:{
        // fontFamily:'Montserrat-Medium',
        fontSize:11,
        color:colors.DARK2,
        marginTop: 12,
    },
    normalText:{
        color: colors.DARK, 
        // fontFamily: 'Montserrat-Medium', 
        fontSize: 13
    },
    btn: {
        backgroundColor: colors.BLUE,
        padding: 5,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginRight: 6
    },
}