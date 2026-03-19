import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { db } from '../Firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ bottle: '', nap: '', diaper: '', notes: '' });

  useEffect(() => {
    getDoc(doc(db, 'times', id)).then((docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setForm({
          bottle: data.bottle || '',
          nap: data.nap || '',
          diaper: data.diaper || '',
          notes: data.notes || ''
        });
      } else {
        console.log("No such document!");
      }
    });
  }, [id]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'times', id), form);
      navigate(`/show/${id}`);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="container">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-bottle">EDIT LOG</h3>
        </div>
        <div className="panel-body">
          <h4><Link to={`/show/${id}`} className="btn btn-primary">Baby Log</Link></h4>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="bottle">bottle:</label>
              <input type="text" className="form-control" id="bottle" name="bottle" value={form.bottle} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="nap">awake:</label>
              <input type="text" className="form-control" id="nap" name="nap" value={form.nap} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="diaper">diaper:</label>
              <input type="text" className="form-control" id="diaper" name="diaper" value={form.diaper} onChange={onChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="notes">notes:</label>
              <input type="text" className="form-control" id="notes" name="notes" value={form.notes} onChange={onChange} />
            </div>
            <button type="submit" className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
