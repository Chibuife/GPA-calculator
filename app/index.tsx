import { Image, StyleSheet, Platform, SafeAreaView, ScrollView, View, Text, TextInput, Pressable, useWindowDimensions } from 'react-native';
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
    const [semesters, setSemesters] = useState([]);
    const [subject, setSubject] = useState()
    const { height } = useWindowDimensions()
    console.log(semesters)
    return (
        <SafeAreaView style={{
            // minHeight:height, 
            flex: 1,
        }} >
            <View style={styles.header}>
                <ThemedText style={styles.headerText} type="subtitle">GPA Calculator</ThemedText>
            </View>
            <ScrollView style={styles.body}>
                <TextInput placeholder='Course Name'
                    value={subject}
                    onChangeText={(e) => setSubject(subject)}
                    style={styles.course} />
                {
                    semesters.map((item, index) => {
                        return (
                            <>
                                <View style={styles.semester}>
                                    <View style={styles.circleBtn}><Text>-</Text></View>
                                    <ThemedText type="defaultSemiBold">Semester {item.id}</ThemedText>
                                </View>
                                {/* <TextInput placeholder='Course Name'
                                    value={subject.course}
                                    // onChangeText={(e) =>subject.course = e}
                                    onChangeText={(e) => [...semesters][index].subjects[subjectindex].course = e}

                                    style={styles.course} /> */}
                                {
                                    item.subjects.map((subject, subjectindex) => {

                                        return (
                                            <View style={styles.inputContainer}>
                                                <View style={styles.input}>
                                                    <TextInput placeholder='Course Name'
                                                        value={subject.course}
                                                        // onChangeText={(e) =>setSemesters([...semesters,{ id: semesters.length + 1, subjects: [{ course: '', grade: '', unit: '' }] }])}
                                                        // onChangeText={(e) => [...semesters][index].subjects[subjectindex].course = e}
                                                        // onChangeText={(e) => subject.course = e}
                                                        onChangeText={(e) =>setSemesters([...semesters,{ id: index, subjects: [{ course: e, grade: '', unit: '' }] }])}

                                                        style={styles.course} />
                                                    <View style={styles.gradeUnitContainer}>
                                                        <Picker
                                                            selectedValue={selectedGrade}
                                                            // onValueChange={(itemValue) => [...semesters][index].subjects[subjectindex].grade = itemValue}
                                                            onValueChange={(itemValue) => [...semesters][index].subjects[subjectindex].grade = itemValue}

                                                            style={[styles.picker, styles.gradePicker]}
                                                        >
                                                            <Picker.Item
                                                                label="Grade"
                                                                enabled={false}
                                                                value="" />
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
                                                <Pressable onPress={() => {
                                                    console.log([...semesters][index].subjects[subjectindex].course, 'course')
                                                    console.log(subject.course, 'cour')
                                                }} style={styles.circleBtn}>
                                                    <Text style={{ fontSize: 12, lineHeight: 18, marginTop: -1, textAlign: 'center' }}>x</Text>
                                                </Pressable>
                                            </View>
                                        )
                                    })
                                }


                                <View style={styles.addCourseContainer}>
                                    <View style={styles.circleBtn}><Text>+</Text></View><Text>Add Course</Text>
                                </View>


                            </>
                        )
                    })
                }
                <View style={styles.semester}>
                    <View style={styles.circleBtn}><Text style={{ fontSize: 12, lineHeight: 18, marginTop: -1, textAlign: 'center' }}>+</Text></View>
                    <Pressable onPress={() => setSemesters([...semesters, { id: semesters.length + 1, subjects: [{ course: '', grade: '', unit: '' }] }])}>
                        <ThemedText type="defaultSemiBold">Add Semester</ThemedText>
                    </Pressable>
                </View>
                {/* <View style={styles.semester}>
                    <View style={styles.circleBtn}><Text>-</Text></View>
                    <ThemedText type="defaultSemiBold">Semester 1</ThemedText>
                </View> */}

                {/* <View style={styles.inputContainer}>
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
                        <Text style={{ fontSize: 12, lineHeight: 18, marginTop: -1, textAlign: 'center' }}>x</Text>
                    </View>
                </View>

                <View style={styles.addCourseContainer}>
                    <View style={styles.circleBtn}><Text>+</Text></View><Text>Add Course</Text>
                </View>

                <View style={styles.semester}>
                    <View style={styles.circleBtn}><Text style={{ fontSize: 12, lineHeight: 18, marginTop: -1, textAlign: 'center' }}>+</Text></View>
                    <ThemedText type="defaultSemiBold">Add Semester</ThemedText>
                </View> */}

                <Pressable style={styles.calculate} onPress={() => console.log(semesters)}>
                    Calculate
                </Pressable>
            </ScrollView>
            {/* <View style={styles.result}>
                <View style={{ justifyContent: 'space-between' }}>
                    <Text>Units Total</Text>
                    <Text>144</Text>
                </View>
                <View style={{ justifyContent: 'space-between' }}>
                    <Text>GPA</Text>
                    <ThemedText type="subtitle">3</ThemedText>
                </View>
            </View> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'white',
        paddingHorizontal: "5%",
        flex: 1,
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
        lineHeight: 20,
        textAlign: 'center',
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
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 20,
        height: 100,
    }
});
