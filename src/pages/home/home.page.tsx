import React from 'react';
import Grid from '../../components/grid/grid.component';
import DOMPurify from 'dompurify';
import {useAppSelector} from '../../store/hooks';

const Home = () => {
  const {jobs} = useAppSelector(state => state.job);
  return (
    <Grid>
      <div className="col-span-12 lg:col-span-8 lg:col-start-3 mb-4">
        <h1 className="text-2xl tracking-wide">Find Jobs.</h1>
        <Grid classNames="mt-2 gap-2">
          <input
            type="text"
            className="border w-full col-span-12 lg:col-span-7 p-2"
            placeholder="Job title, keywords, company"
          />
          <input
            type="text"
            className="border w-full col-span-12 lg:col-span-3 p-2"
            placeholder="Location"
          />
          <button className="border w-full col-span-12 lg:col-span-2 p-2">
            Search
          </button>
        </Grid>
      </div>
      <div className="col-span-12">
        <Grid>
          <div className="hidden md:block md:col-span-2">
            <h2>Filter</h2>
          </div>
          <div className="col-span-12 md:col-span-8 ">
            <h2 className="mb-4">Job Results</h2>
            <div className="jobs space-y-4">
              {jobs &&
                jobs.map((job, id) => {
                  return (
                    <div className="border p-3" key={id}>
                      <h2 className="text-lg font-bold mb-2">{job.title}</h2>
                      <div className="text-gray-600 text-sm flex space-x-2">
                        <div>
                          {job.payType} - {job.payRate}{' '}
                        </div>
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(job.desc),
                        }}
                      ></div>
                    </div>
                  );
                })}
            </div>
          </div>
        </Grid>
      </div>
    </Grid>
  );
};

export default Home;
