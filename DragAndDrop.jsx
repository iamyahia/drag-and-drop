import React from 'react';
import { ReactComponent as File } from '@assets/drag-drop.svg';
import classNames from 'classnames';
import { importFile } from '@/apis/dragDrop';

function DragAndDrop({ data, dispatch, isMultiple, setProgress, setError }) {
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(isMultiple);

    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth + 1 });
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth - 1 });
    // if (data.dropDepth > 0) return;
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    e.dataTransfer.dropEffect = 'copy';
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true });
  };

  const handleTestName = async (e, isDrag) => {
    const files = isDrag ? [...e.dataTransfer.files] : [...e.target.files];

    if (isMultiple) {
      if (data.fileList.length < 2 && files.length < 3) {
        dispatch({ type: 'ADD_FILE_TO_LIST', files });
        dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
        dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
        try {
          await importFile(files[0], setError, setProgress);

          console.log('after await');
        } catch (err) {
          console.log('err', err);
        }
      } else {
        console.log('MORE that 3');
        dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
        dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
        alert('you can just select 2 file');
      }
    } else if (data.fileList.length < 1 && files.length) {
      //* if isMultiple set to {false}
      console.log('single: data.fileList.length: ', data.fileList.length);
      dispatch({ type: 'ADD_FILE_TO_LIST', files });
    } else {
      alert('you can just select single file');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      e.dataTransfer.files &&
      e.dataTransfer.files.length > 0 &&
      data.fileList.length !== 1
    ) {
      handleTestName(e, true);
    } else {
      alert('please drag less than 2 file');
      dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
      dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    e.stopPropagation();

    handleTestName(e, false);
  };

  return (
    <div
      className={classNames(
        'flex w-[448px] flex-col items-center justify-center rounded-2xl border border-dashed  p-4 text-center',
        {
          'border-light-cyan bg-green-shade-100': data.inDropZone,
          'bg-white': !data.inDropZone,
        },
      )}
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
    >
      <div className="mt-1 text-gray-400">
        <File />
      </div>
      <div className="mt-5 mb-2.5">
        <h1 className="mb-3 text-sm text-black ">
          {' '}
          <label
            className="text-light-cyan hover:cursor-pointer"
            htmlFor="file-upload"
          >
            حدد ملفًا
          </label>{' '}
          أو اسحبه الى هنا
        </h1>
        <p className="text-xxs text-black opacity-40">
          تنسيق PDF فقط بأقصى حجم للملف 4MB
        </p>
      </div>
      {/* <label
        
        className="rounded-lg border border-solid border-light-cyan bg-white p-2.5 text-xs text-light-cyan hover:bg-green-shade-200 hover:text-light-cyan active:bg-green-shade-300"
      >
        Select file
      </label> */}
      <input
        type="file"
        onChange={handleFileChange}
        id="file-upload"
        hidden
        accept=".pdf"
        multiple={isMultiple}
      />
    </div>
  );
}

export default DragAndDrop;
