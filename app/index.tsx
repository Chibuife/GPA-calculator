import { Image, StyleSheet, Platform, SafeAreaView, ScrollView, View, Text, TextInput, Pressable } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
const grade = [
    { mark: 'A', points: 5 },
    { mark: 'B', points: 4 },
    { mark: 'C', points: 3 },
    { mark: 'D', points: 2 },
    { mark: 'E', points: 1 },
    { mark: 'F', points: 0 },
]

const units = [3, 2, 1]
export default function HomeScreen() {
    const [selectedGrade, setSelectedGrade] = useState("placeholder");
    const [selectedUnits, setSelectedUnits] = useState("placeholder");

    return (
        <SafeAreaView >
            <View style={styles.header}>
                <ThemedText style={styles.headerText} type="subtitle">GPA Calculator</ThemedText>
            </View>
            <ScrollView style={styles.body}>


                <View style={styles.semester}>
                    <View style={styles.circleBtn}><Text>-</Text></View>
                    <ThemedText type="defaultSemiBold">Semester 1</ThemedText>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.input}>
                        <TextInput placeholder='Course Name' style={styles.course} />
                        <View style={styles.gradeUnitContainer}>
                            <Picker
                                selectedValue={selectedGrade}
                                onValueChange={(itemValue) => setSelectedGrade(itemValue)}
                                style={[styles.picker, styles.gradePicker]}
                            >
                                <Picker.Item
                                    label="Grade"
                                    enabled={false}
                                    value="placeholder" />
                                {grade.map((gradeOption) => (
                                    <Picker.Item key={gradeOption.mark} label={gradeOption.mark} value={gradeOption.mark} />
                                ))}
                            </Picker>

                            <Picker
                                selectedValue={selectedUnits}
                                onValueChange={(itemValue) => setSelectedUnits(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item
                                    label="Units"
                                    enabled={false}
                                    value="placeholder" />
                                {units.map((unit) => (
                                    <Picker.Item key={unit} label={`${unit}`} value={unit} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.circleBtn}>
                        <Text>x</Text>
                    </View>
                </View>

                <View style={styles.addCourseContainer}>
                    <View style={styles.circleBtn}><Text>+</Text></View><Text>Add Course</Text>
                </View>

                <View style={styles.semester}>
                    <View style={styles.circleBtn}><Text>+</Text></View>
                    <ThemedText type="defaultSemiBold">Add Semester</ThemedText>
                </View>

                <Pressable style={styles.calculate} onPress={() => console.log('a')}>
                    Calculate
                </Pressable>
                <View style={styles.result}>
                    <View>
                        <Text>Units Total</Text>
                        <Text>144</Text>
                    </View>
                    <View>
                        <Text>GPA</Text>
                        <Text>3</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.result}>
                <View>
                    <Text>Units Total</Text>
                    <Text>144</Text>
                </View>
                <View>
                    <Text>GPA</Text>
                    <Text>3</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        paddingHorizontal: "5%",
        flex: 1,
        minHeight: '100vh'
    },
    header: {
        backgroundColor: 'orange',
        padding: 45
    },
    headerText: {
        color: 'white',
        textAlign: 'center',
    },
    circleBtn: {
        borderRadius: "100%",
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 20,
        maxHeight: 20,
        cursor: 'pointer',
        padding: 5,
        lineHeight: 0
    },
    semester: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 10
    },
    course: {

        padding: 5,
        outline: 'none',
    },
    gradeUnitContainer: {
        flexDirection: 'row',
    },
    picker: {
        flex: 1,
        padding: 5,
        borderTopWidth: 1,
        borderWidth: 0,
    },
    gradePicker: {
        borderRightWidth: 1,
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
        flex: 1
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: 'center',
        gap: 5,
        marginVertical: 20
    },
    addCourseContainer: {
        borderStyle: 'dashed',
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: 'center',
        height: 60,
        alignItems: 'center',
        gap: 5,
        borderRadius: 5,
    },
    calculate: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
        color: 'white',
        marginVertical: 20,
        marginHorizontal: 'auto',
        borderRadius: 25,
        padding: 10
    },
    result: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    }
});
