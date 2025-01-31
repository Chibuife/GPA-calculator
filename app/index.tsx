import { Image, StyleSheet, Platform, SafeAreaView, ScrollView, View, Text, TextInput, Pressable, useWindowDimensions, TouchableOpacity, Button, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    type Subject = {
        course: string;
        grade: string;
        unit: string;
    };

    type Semester = {
        id: number;
        subjects: Subject[];
    };
    const [semesters, setSemesters] = useState<Semester[]>([]);
    const [gpa, setgpa] = useState(0)
    const [unit, setUnit] = useState(0)
    const saveData = async () => {
        try {
            await AsyncStorage.setItem('@userGPA', JSON.stringify(semesters));
            console.log('Data saved successfully');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const getArray = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@userGPA');
            if (jsonValue !== null) {
                const courses = JSON.parse(jsonValue); // Convert back to an array
                console.log('Retrieved Array:', courses);
                setSemesters(courses)
            } else {
                console.log('No data found');
            }
        } catch (error) {
            console.error('Error retrieving array:', error);
        }
    };
    const calculateResult = () => {
        semesters.map((item, index) => {
            item.subjects.map((subject, subindex) => {
                console.log('subject')
                if (subject.course === "" || subject.grade === "" || subject.unit === "") return alert(`Please make sure to update semester ${item.id} course ${subject.course}  grades and units `)
                if (subject.grade === "A") {
                    const gp = 5 * parseInt(subject.unit)
                    setgpa(gpa + gp)
                    setUnit(unit + parseInt(subject.unit))
                } else if (subject.grade === "B") {
                    const gp = 4 * parseInt(subject.unit)
                    setgpa(gpa + gp)
                    setUnit(unit + parseInt(subject.unit))
                } else if (subject.grade === "C") {
                    const gp = 3 * parseInt(subject.unit)
                    setgpa(gpa + gp)
                    setUnit(unit + parseInt(subject.unit))
                } else if (subject.grade === "D") {
                    const gp = 2 * parseInt(subject.unit)
                    setgpa(gpa + gp)
                    setUnit(unit + parseInt(subject.unit))
                } else if (subject.grade === "E") {
                    const gp = 1 * parseInt(subject.unit)
                    setgpa(gpa + gp)
                    setUnit(unit + parseInt(subject.unit))
                } else if (subject.grade === "F") {
                    const gp = 0 * parseInt(subject.unit)
                    setgpa(gpa + gp)
                    setUnit(unit + parseInt(subject.unit))
                }
            })
        })
        saveData()
    }
    return (
        <SafeAreaView style={{
            flex: 1,
        }} >
            <View style={styles.header}>
                <ThemedText style={styles.headerText} type="subtitle">GPA Calculator</ThemedText>
            </View>
            <ScrollView style={styles.body}>
                {
                    semesters.map((item, index) => {
                        return (
                            <View key={index}>
                                <View >
                                    <Pressable style={styles.semester} onPress={() => {
                                        const updatedSemesters = semesters.filter((_, semIndex) => index !== semIndex)
                                        setSemesters(updatedSemesters)
                                    }}>
                                        <View style={styles.circleBtn}><Text>-</Text></View>
                                        <ThemedText type="defaultSemiBold">Semester {item.id}</ThemedText>
                                    </Pressable>
                                </View>
                                {
                                    item.subjects.map((subject, subindex) => {
                                        return (
                                            <View style={styles.inputContainer} key={subindex}>
                                                <View style={styles.input}>
                                                    <TextInput
                                                        placeholder='Course Name'
                                                        accessibilityLabel="Course Name"
                                                        value={subject.course}
                                                        onChangeText={(e) => {
                                                            const updatedSemesters = semesters.map((semester, semesterIndex) => {
                                                                if (semesterIndex === index) { // Replace `index` with `semesterIndex`
                                                                    return {
                                                                        ...semester,
                                                                        subjects: semester.subjects.map((subject, subjectIndex) => {
                                                                            if (subjectIndex === subindex) { // Ensure you use the correct `subjectIndex`
                                                                                return {
                                                                                    ...subject,
                                                                                    course: e, // Update only the `course` field
                                                                                };
                                                                            }
                                                                            return subject; // Retain other subjects unchanged
                                                                        }),
                                                                    };
                                                                }
                                                                return semester; // Retain other semesters unchanged
                                                            });
                                                            setSemesters(updatedSemesters);

                                                        }}
                                                        style={styles.course} />
                                                    <View style={styles.gradeUnitContainer}>
                                                        <Picker
                                                            selectedValue={subject.grade}
                                                            onValueChange={(itemValue) => {
                                                                const updatedSemesters = semesters.map((semester, semesterIndex) => {
                                                                    if (semesterIndex === index) { // Replace `index` with `semesterIndex`
                                                                        return {
                                                                            ...semester,
                                                                            subjects: semester.subjects.map((subject, subjectIndex) => {
                                                                                if (subjectIndex === subindex) { // Ensure you use the correct `subjectIndex`
                                                                                    return {
                                                                                        ...subject,
                                                                                        grade: itemValue, // Update only the `grade` field
                                                                                    };
                                                                                }
                                                                                return subject; // Retain other subjects unchanged
                                                                            }),
                                                                        };
                                                                    }
                                                                    return semester; // Retain other semesters unchanged
                                                                });
                                                                setSemesters(updatedSemesters);
                                                            }}
                                                            accessibilityLabel="Grade"
                                                            placeholder='Grade'
                                                            style={[styles.picker, styles.gradePicker]}
                                                        >
                                                            {/* <Picker.Item
                                                                label="Grade"
                                                                enabled={false}
                                                                value="" /> */}
                                                            {grade.map((gradeOption) => (
                                                                <Picker.Item key={gradeOption.mark} label={gradeOption.mark} value={gradeOption.mark} />
                                                            ))}
                                                        </Picker>

                                                        <Picker
                                                            selectedValue={subject.unit}
                                                            onValueChange={(itemValue) => {
                                                                const updatedSemesters = semesters.map((semester, semesterIndex) => {
                                                                    if (semesterIndex === index) { // Replace `index` with `semesterIndex`
                                                                        console.log(subject)
                                                                        return {
                                                                            ...semester,
                                                                            subjects: semester.subjects.map((subject, subjectIndex) => {
                                                                                if (subjectIndex === subindex) { // Ensure you use the correct `subjectIndex`
                                                                                    return {
                                                                                        ...subject,
                                                                                        unit: itemValue, // Update only the `unit` field
                                                                                    };
                                                                                }
                                                                                return subject; // Retain other subjects unchanged
                                                                            }),
                                                                        };
                                                                    }
                                                                    return semester; // Retain other semesters unchanged
                                                                });
                                                                setSemesters(updatedSemesters);
                                                            }}
                                                            accessibilityLabel="Units"
                                                            placeholder='Units'
                                                            style={styles.picker}
                                                        >
                                                            <Picker.Item
                                                                label="Units"
                                                                enabled={false}
                                                                value="" />
                                                            {units.map((unit) => (
                                                                <Picker.Item key={unit} label={`${unit}`} value={unit} />
                                                            ))}
                                                        </Picker>
                                                    </View>
                                                </View>
                                                <Pressable onPress={() => {
                                                    const updatedSemesters = semesters.map((semester, semindex) => {
                                                        if (index === semindex) {
                                                            return {
                                                                ...semester,
                                                                subjects: semester.subjects.filter((_, subjectIndex) => subjectIndex !== subindex), // Remove the subject
                                                            };
                                                        }
                                                        return semester; // Keep other semesters unchanged
                                                    });

                                                    setSemesters(updatedSemesters);
                                                }} style={styles.circleBtn}>
                                                    <Text style={{ fontSize: 12, lineHeight: 18, marginTop: -1, textAlign: 'center' }}>x</Text>
                                                </Pressable>
                                            </View>
                                        )
                                    })
                                }


                                <Pressable onPress={() => {
                                    const updatedSemesters = semesters.map((semester, semindex) => {
                                        if (index === semindex) {
                                            return {
                                                ...semester,
                                                subjects: [
                                                    ...semester.subjects,
                                                    { course: '', grade: '', unit: '' }, // Add a new subject with default values
                                                ],
                                            };
                                        }
                                        return semester; // Keep other semesters unchanged
                                    });

                                    setSemesters(updatedSemesters);
                                }} >
                                    <View style={styles.addCourseContainer}>
                                        <View style={styles.circleBtn}><Text>+</Text></View><Text>Add Course</Text>
                                    </View>
                                </Pressable>
                            </View>
                        )
                    })
                }
                <TouchableOpacity onPress={() => {
                    setSemesters([...semesters, { id: semesters.length + 1, subjects: [{ course: '', grade: '', unit: '' }] }])
                }}>
                    <View style={styles.semester}>
                        <View style={styles.circleBtn}><Text style={{ fontSize: 12, lineHeight: 18, marginTop: -2, textAlign: 'center' }}>+</Text></View>
                        <ThemedText type="defaultSemiBold">Add Semester</ThemedText>
                    </View>
                </TouchableOpacity>

                <Pressable style={styles.calculate} onPress={() => calculateResult()}>
                    <Text style={{ color: 'white' }}>Calculate</Text>
                </Pressable>
            </ScrollView >
            <View style={styles.result}>
                <View style={{ justifyContent: 'space-between' }}>
                    <Text>Units Total</Text>
                    <Text>{unit}</Text>
                </View>
                <View style={{ justifyContent: 'space-between' }}>
                    <Text>GPA</Text>
                    <ThemedText type="subtitle">{gpa > 0 ? gpa / unit : 0}</ThemedText>
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
        marginBottom: 100,
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
        minWidth: 30,
        height: 30,
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
        backgroundColor: 'white',
        borderColor: 'rgb(0 0 0 / 46%)'
    }
});
