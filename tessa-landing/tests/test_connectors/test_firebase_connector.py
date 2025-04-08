import pytest
import connectors.firebase_connector as firebase

@pytest.mark.integration
def test_get_firestore_client():
    db = firebase.get_firestore_client()
    test_doc_ref = db.collection(u'tests').document(u'testConnection')
    test_doc = test_doc_ref.get()
    assert test_doc.exists
    test_doc_data = test_doc.to_dict()
    assert 'hi' in test_doc_data
    assert test_doc_data['hi'] == 'hi'
   


    
    