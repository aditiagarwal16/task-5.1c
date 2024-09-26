import React, { useEffect, useState } from 'react';
import { Card, Button, Input, Dropdown, Form } from 'semantic-ui-react';
import { firestore } from '../firebase'; // Import Firestore
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import Draggable from 'react-draggable'; // Import Draggable for drag-and-drop

const FindQuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState(null); // Track expanded question

  // Fetch questions from Firestore
  useEffect(() => {
    const fetchQuestions = async () => {
      const questionCollection = collection(firestore, 'questions');
      const questionSnapshot = await getDocs(questionCollection);
      const questionList = questionSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(q => !q.isDeleted); // Exclude deleted questions

      setQuestions(questionList);
      setFilteredQuestions(questionList);
    };

    fetchQuestions();
  }, []);

  // Filter questions by search term, tag, and date
  useEffect(() => {
    let updatedList = questions;

    // Filter by search term (title or description)
    if (searchTerm) {
      updatedList = updatedList.filter(q => 
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        q.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by tag
    if (filterTag) {
      updatedList = updatedList.filter(q => q.tags && q.tags.includes(filterTag));
    }

    // Filter by date
    if (filterDate) {
      updatedList = updatedList.filter(q => {
        const questionDate = new Date(q.date.seconds * 1000).toISOString().split('T')[0];
        return questionDate === filterDate;
      });
    }

    setFilteredQuestions(updatedList);
  }, [searchTerm, filterTag, filterDate, questions]);

  // Soft delete a question
  const handleDelete = async (id) => {
    try {
      await updateDoc(doc(firestore, 'questions', id), { isDeleted: true });
      setQuestions(questions.filter(q => q.id !== id)); // Remove from UI
    } catch (error) {
      alert('Error deleting question: ' + error.message);
    }
  };

  // Expand a question to show more details
  const handleExpand = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id); 
  };

  return (
    <div>
      <h3>Find Questions</h3>

      {/* Search and Filter Section */}
      <Form>
        <Form.Field>
          <Input 
            icon='search' 
            placeholder='Search by title or description...' 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            style={{ marginBottom: '20px' }} 
          />
        </Form.Field>

        {/* Filter by Tag */}
        <Form.Field>
          <Dropdown
            placeholder='Filter by Tag'
            fluid
            selection
            clearable
            options={[{ text: 'Java', value: 'Java' }, { text: 'React', value: 'React' }]} // Example tags
            value={filterTag}
            onChange={(e, { value }) => setFilterTag(value)}
            style={{ marginBottom: '20px' }}
          />
        </Form.Field>

        {/* Filter by Date */}
        <Form.Field>
          <label>Filter by Date</label>
          <Input 
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            style={{ marginBottom: '20px' }} 
          />
        </Form.Field>
      </Form>

      {/* Display the List of Questions */}
      <Card.Group>
        {filteredQuestions.map(question => (
          <Draggable key={question.id}>
            <div className="draggable-container">  {/* Wrap in a valid HTML element */}
              <Card>
                <Card.Content>
                  <Card.Header>{question.title}</Card.Header>
                  <Card.Meta>{question.date ? new Date(question.date.seconds * 1000).toLocaleDateString() : ''}</Card.Meta>
                  <Card.Description>
                    {expandedQuestion === question.id 
                      ? question.description
                      : question.description.substring(0, 100) + '...'} 
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <Button onClick={() => handleExpand(question.id)} basic color='blue'>
                    {expandedQuestion === question.id ? 'Collapse' : 'View Details'}
                  </Button>
                  <Button onClick={() => handleDelete(question.id)} basic color='red'>
                    Delete
                  </Button>
                </Card.Content>
              </Card>
            </div>
          </Draggable>
        ))}
      </Card.Group>
    </div>
  );
};

export default FindQuestionPage;
