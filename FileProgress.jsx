import { ReactComponent as Pdf } from '@assets/pdf.svg';
import { ReactComponent as Close } from '@assets/close.svg';
import classNames from 'classnames';

function FileProgress({ files, progress, error }) {
  return (
    <div className="mt-4 flex w-[448px] flex-col rounded-lg bg-[#F7F7F7] px-2.5 py-3">
      <div
        className={classNames('flex', {
          'text-red': !error,
          'text-gray': error,
        })}
      >
        <div>
          <Pdf />
        </div>
        <div className="mr-2 w-full">
          <div className="flex w-full justify-between text-xs">
            <div className="flex items-center gap-2">
              <p className="m-0  text-gray-custom-100">{files.name}</p>{' '}
              <div className="h-1 w-1 rounded-full bg-gray-custom-100" />
              {error ? (
                <p className="m-0 text-red">حاول ثانية</p>
              ) : (
                <p className="m-0 text-red">عرض</p>
              )}
            </div>
            <Close />
          </div>
          <div className="flex justify-between text-[0.625rem] text-gray-custom-400 transition duration-500 ease-linear">
            <p className=" m-0"> {(files.size / 1024 ** 2).toFixed(1)} م.ب</p>
            {/* <p>te</p> */}
            {!error && progress && <p>{progress}%</p>}
          </div>
        </div>
      </div>
      {!error && progress && (
        <div className="h-1 w-full bg-gray-300">
          <div class="h-1 bg-red" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      {/* {!error && progress && (
        <ProgressBar now={progress} label={`${progress}%`} />
      )} */}
    </div>
  );
}

export default FileProgress;
