import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'

import { COLORS, FONT, SIZES } from '../../../constants';
import { router } from 'expo-router';

const dataMap = [
    {
        id: 0,
        title: 'Applied Job',
        key: 'appliedJob',
        iconName: 'desktop',
        route: "/employeeManage/apply"
    },
    {
        id: 1,
        title: 'Saved Job',
        key: 'savedJob',
        iconName: 'bookmarks',
        route: "/employeeManage/save"
    },
    {
        id: 2,
        title: 'Suitabled Job',
        key: 'suitabledJob',
        iconName: 'checkmark-circle',
        route: "/employeeManage/suitable"
    }
]

const ApplyManagement = ({user}) => {
    return (
        <View style={styles.container}>
            {dataMap.map((item) => (
                <TouchableOpacity onPress={() => router.push(item.route)} style={styles.itemStyle} key={item.id}>
                    <View style={styles.iconStyle}>
                        <Ionicons style={{marginLeft: 2}} name={item.iconName} size={20} color={COLORS.tertiary} />
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={{fontFamily: FONT.medium, width: '65%'}}>{item.title}</Text>
                        <Text style={{fontFamily: FONT.medium, fontSize: SIZES.large}}>{user[item.key]?.data.length}</Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%', 
        marginTop: 15, 
        columnGap: 10,
        rowGap: 10
    },
    itemStyle: {
        width: '48%',
        borderRadius: 5,
        padding: 15,
        backgroundColor: '#ECECEC',
    },
    iconStyle: {
        backgroundColor: '#fff',
        width: 38,
        height: 38,
        borderRadius: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        width: '100%'
    },
})

export default ApplyManagement;
